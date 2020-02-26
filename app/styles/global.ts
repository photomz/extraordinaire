const baseNum = 8;
export default {
  color: {
    white: '#FAFAFA',
    gray: '#525F7F',
    lightgray: '#f5f5f5',
    black: '#212121',
    purple: '#53f',
    turquoise: '#05d5ff',
    lime: '#a6ffcb'
  },
  easingFn: {
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)'
  },
  layout: {
    margin1: baseNum * 16,
    margin2: baseNum * 8,
    margin3: baseNum * 4,
    margin4: baseNum * 2,
    margin5: baseNum,
    padding1: baseNum * 8,
    padding2: baseNum * 4,
    padding3: baseNum * 3,
    padding4: baseNum * 2,
    padding5: baseNum
  },
  gradient(direction = 150) {
    return {
      cool: `linear-gradient(${direction}deg, ${this.color.purple} 15%,${this.color.turquoise} 70%, ${this.color.lime} 94%)`,
      greenorangepink: `linear-gradient(${direction}deg, #40e0d0 15%, #ff8c00 70%, #ff0080 94%)`,
      turquoisegreen: `linear-gradient(${direction}deg, #11998e 15%, #38ef7d 70%)`,
      redblue: `linear-gradient(${direction}deg, #fc466b 15%, #3f5efb 70%)`,
      yellow: `linear-gradient(${direction}deg, #cac531 15%, #f3f9a7 70%)`,
      purpleWhite: `linear-gradient(${direction}deg, #03001e, #7303c0, #ec38bc, #fdeff9)`
    };
  },
  border: {
    radius1: baseNum * 4,
    radius2: baseNum * 2,
    radius3: baseNum
  },
  ellipsis: `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  `,
  dropShadow: {
    normal: '0px 3px 8px rgba(0, 0, 0, 0.15)',
    repressed: '0px 8px 12px rgba(0, 0, 0, 0.15)'
  },
  br: `br {
    content: "";
    display: block;
    margin: 0.75em 0;
  }`,
  font: {
    size: {
      headline: 48,
      title: 36,
      subtitle: 28,
      header: 24,
      subheader: 20,
      paragraph: 16
    }
  }
};
