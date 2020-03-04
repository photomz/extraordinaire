/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import shortid from 'shortid';
import IPC from './constants/ipcActions.json';
import MenuBuilder from './menu';
import db from '../db/db.json';

ipcMain.handle(IPC.PROCESS.PLATFORM, () => process.platform);
interface Question {
  number: number;
  statement: string;
  a: string;
  b: string;
  c: string;
}

interface MarkScheme {
  letter: string;
  statement: string;
  level: Array<string | null>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const recurseAccess = (
  subdb: Database | number | null,
  keys: unknown | unknown[] // Array of strings (keys) and numbers (string indices)
) => {
  if (keys.length === 0) return subdb;
  if (subdb[keys[0]] === undefined) return new Error('Access invalid');
  return recurseAccess(subdb[keys[0]], keys.slice(1));
};

ipcMain.handle(
  IPC.DB.QUERY,
  (
    e: Electron.IpcMainInvokeEvent,
    accessArr: string[]
  ): Question | MarkScheme => recurseAccess(db, accessArr)
);

type Database = Record<string, unknown> | Record<string, unknown>[] | string[];

// Returns key stack trace of location in db, last index is index in string
const recurseSearch = (
  dbSection: Database,
  keyword: string,
  keys: string[],
  searchPaths: string[][] | unknown[]
): string[][] => {
  let keyArr: string[] = JSON.parse(JSON.stringify(keys));
  if (Array.isArray(dbSection)) {
    for (let i = 0; i < dbSection.length; i += 1) {
      // console.log(dbSection);
      if (typeof dbSection[i] === 'string') {
        const searchIndex: number = dbSection[i].toLowerCase().search(keyword);
        if (searchIndex !== -1) {
          keyArr.push(i);
          keyArr.push(searchIndex);
          searchPaths.push(JSON.parse(JSON.stringify(keyArr)));
          keyArr = JSON.parse(JSON.stringify(keys));
        }
      } else if (
        Array.isArray(dbSection) ||
        (typeof dbSection === 'object' && dbSection !== null)
      ) {
        const newKeyArr: string[] = JSON.parse(JSON.stringify(keyArr));
        newKeyArr.push(i);
        recurseSearch(dbSection[i], keyword, newKeyArr, searchPaths);
        // if (searchResult !== null) searchPaths.push(searchResult);
      }
    }
    return searchPaths;
  }
  Object.entries(dbSection).forEach(([key, val]) => {
    // console.log(`${key}: ${val}`);
    if (typeof val === 'string') {
      const searchIndex: number = val.toLowerCase().search(keyword);
      if (searchIndex !== -1) {
        keyArr.push(key);
        keyArr.push(searchIndex);
        searchPaths.push(JSON.parse(JSON.stringify(keyArr)));
        keyArr = JSON.parse(JSON.stringify(keys));
      }
    } else if (
      Array.isArray(val) ||
      (typeof val === 'object' && val !== null)
    ) {
      const newKeyArr: string[] = JSON.parse(JSON.stringify(keyArr));
      newKeyArr.push(key);
      recurseSearch(val, keyword, newKeyArr, searchPaths);
      //  if (searchResult !== null) return searchResult;
    }
  });
  return searchPaths;
};

const promisedSearch = (keyword: string): Promise<string[][]> =>
  new Promise((resolve, reject) => {
    try {
      resolve(recurseSearch(db, keyword.toLowerCase(), [], []));
    } catch (e) {
      reject(e);
    }
  });

const objectifyRaw = (raw: string[][]): Record<string, unknown> => {
  const [
    paperType,
    year,
    season,
    timezone,
    questionNumber,
    questionLetter,
    ...rest
  ] = raw;
  const standardProps = {
    paperType,
    year,
    season,
    timezone,
    questionNumber,
    questionLetter,
    raw,
    key: shortid.generate()
  };
  if (paperType === 'qp') {
    const [index] = rest;
    return {
      ...standardProps,
      index,
      path: raw.slice(0, raw.length - 1)
    };
  }
  if (paperType === 'ms') {
    const index = rest[rest.length - 1];
    return {
      ...standardProps,
      index,
      path: raw.slice(0, 6) // Standard paperType -> letter path of length 6
    };
  }
  throw new Error(`Paper type unexpected "${paperType}"`);
};

interface DBSearchArgs {
  keyword: string;
  paperType: string;
  year: string;
}

ipcMain.handle(IPC.DB.SEARCH, (e, { keyword, paperType, year }: DBSearchArgs) =>
  promisedSearch(keyword)
    .then(res =>
      res.filter(resArr => (paperType ? resArr[0] === paperType : true))
    ) // Paper type
    .then(res =>
      res.filter(resArr =>
        // Type coercion is preferred - resArr[1] is string, year is string
        // eslint-disable-next-line eqeqeq
        year ? resArr[1] == year - 2000 : true
      )
    )
    .then(resArr =>
      resArr.map(res =>
        /* console.error(objectifyRaw(res)) || */ objectifyRaw(res)
      )
    )
);

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    titleBarStyle: 'hiddenInset',
    vibrancy: 'dark',
    webPreferences:
      process.env.NODE_ENV === 'development' || process.env.E2E_BUILD === 'true'
        ? {
            nodeIntegration: true
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js')
          }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
