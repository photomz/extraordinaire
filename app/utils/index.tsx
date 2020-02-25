import { useEffect, useMemo, RefObject, ReactText } from 'react';
import { bindActionCreators, ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import shortid from 'shortid';
/**
 * Informs if a click outside the given ref is done.
 * @param {array} refArray - Array of component refs to avoid
 * @param {func} callback - A callback function to run if user clicked outside the array of
 *  components
 */
const useOutsideClick = (
  refArray: Array<RefObject<HTMLElement | Node>>,
  callback: (e?: MouseEvent) => unknown
) => {
  const handleOutsideClick = (event: MouseEvent) => {
    let outsideClick = false;

    if (!(Array.isArray(refArray) && refArray.length > 0)) {
      // eslint-disable-next-line no-console
      console.warn('Please pass in an array of refs.');
    }

    refArray.forEach(ref => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (refArray.length > 1) {
          refArray
            .filter(refPrime => ref !== refPrime)
            .forEach(refPrime => {
              if (
                refPrime.current &&
                !refPrime.current.contains(event.target as Node)
              )
                outsideClick = true;
            });
        } else outsideClick = true;
      }
    });

    if (outsideClick) {
      callback(event);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    };
  }, []);
};

/**
 * Takes in 1 array of objects, and add keys to them.
 * @param {array} items - 1 array of objects.
 * @returns {array}
 */
const addKeys = (items: Array<Record<string, unknown>>) =>
  items.map(item => ({ ...item, key: shortid.generate() }));

/**
 * Takes in a string, and convert internal link strings to actual Gatsby link components
 * Returns an array of the string with the link components spliced in it.
 * You can directly use the results of this util function into a JSX component.
 * @param {string} subject - String with <Link><linkURL>|<linkText></Link> in it.
 * Even if there aren't any matching substrings in it, it will just return an array of one item
 * You can still use it directly as a children of a component.
 * @param {React.Component} [ LinkComponent ] - Optional parameter to use your own
 * Link component instead. If not passed in, it will use the default styled Link component here
 * @returns {array} - returns an array of spliced in original string and Gatsby Link components
 */

const parseTimeToDayMonth = (item: ReactText) => {
  const date = new Date(item);
  const day = date.getDate();
  const month = date.toLocaleString('en-us', { month: 'short' });

  return `${day} ${month}`;
};

const parseTimeToDayName = (item: ReactText) => {
  const date = new Date(item);

  return date.toLocaleString('en-us', { weekday: 'short' });
};

/**
 * Binds an array of actions or 1 action, and dispatches it using useDispatch.
 * @param {[Function]|Function} actions - Array or 1 action.
 * @param {[Function]} deps - Dependencies for useMemo. useMemo will only
 * recompute if one of the dependencies are updated.
 * @returns {[Function]|Function} Array of dispatches or 1 dispatch depending on the passed in data
 */
const useActions = (
  actions:
    | ActionCreatorsMapObject<unknown>
    | ActionCreatorsMapObject<unknown>[],
  deps = []
) => {
  const dispatch = useDispatch();

  return useMemo(() => {
    if (Array.isArray(actions)) {
      return actions.map(action => bindActionCreators(action, dispatch));
    }
    return bindActionCreators(actions, dispatch);
  }, [dispatch, ...deps]);
};

export {
  useOutsideClick,
  addKeys,
  parseTimeToDayMonth,
  parseTimeToDayName,
  useActions
};
