// 轮播图类
class Slide {
  constructor() {
    this.slideBoxDOM = document.querySelector('.cheng_body');
    this.slideLeftBtnDOM = this.slideBoxDOM.querySelector('.slide-left-btn');
    this.slideRightBtnDOM = this.slideBoxDOM.querySelector('.slide-right-btn ');
    this.bannerBoxDOM = this.slideBoxDOM.querySelector('.cheng_ba o');

    // 记数器，记录当前所展示的横幅序号（不可直接操作变值）
    this._currentIndex = 0;
    this.bannerItemDOMs = null;
    // bannerItemDOMs length
    this.bannerItemDOMsLen = 0;

    // 图片对象数组
    this.banners = [
      {
        imageName: '1.png',
      },
      {
        imageName: '2.png',
      },
      {
        imageName: '3.png',
      },
      {
        imageName: '4.png',
      },
      {
        imageName: '5.png',
      },
      {
        imageName: '6.png',
      },
      {
        imageName: '7.png',
      },
      // 可以继续增加图片
    ];
    this.imageUrl = './images/';

    // 定时器
    this.timer = null;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  // 用来监听记数器变化，根据变换来改变当前的横幅
  set currentIndex(num) {
    // 将所有横幅归初始
    Object.values(this.bannerItemDOMs).forEach((item, i) => {
      item.classList.remove('left', 'middle', 'right');
      item.onclick = null;
      this.paginationBoxDOM.children[i].classList.remove('chose');
    });

    if (num < 0) {
      this._currentIndex = this.bannerItemDOMsLen - 1;
    } else if (num >= this.bannerItemDOMsLen) {
      this._currentIndex = 0;
    } else {
      this._currentIndex = num;
    }
    this.paginationBoxDOM.children[this._currentIndex].classList.add('chose');

    if (this._currentIndex === 0) {
      this.showCurrentBanner(this.bannerItemDOMsLen - 1, this._currentIndex, this._currentIndex + 1);
    } else if (this._currentIndex === this.bannerItemDOMsLen - 1) {
      this.showCurrentBanner(this._currentIndex - 1, this._currentIndex, 0);
    } else {
      this.showCurrentBanner(this._currentIndex - 1, this._currentIndex, this._currentIndex + 1);
    }
  }

  // 显示当前横幅
  showCurrentBanner(leftIndex, middleIndex, rightIndex) {
    console.log(leftIndex, rightIndex, middleIndex)
    this.bannerItemDOMs[leftIndex].classList.add('left');
    this.bannerItemDOMs[middleIndex].classList.add('middle');
    this.bannerItemDOMs[rightIndex].classList.add('right');
    this.bannerItemDOMs[leftIndex].onclick = () => {
      this.currentIndex--;
    };
    this.bannerItemDOMs[rightIndex].onclick = () => {
      this.currentIndex++;
    }
  }

  // 获取 bannerItemDOMs
  getBannerItemDOMs() {
    return this.slideBoxDOM.querySelectorAll('.banner-item');
  }

  // 获取 banner-itemDOM 字符串，用来渲染 DOM
  getBannerItemHTML(imageName) {
    return `<div class="banner-item"><img src="${this.imageUrl+imageName}"></div>`
  }

  // 渲染 DOM
  // drawDOM(banners) {
  //   this.bannerBoxDOM.innerHTML = banners.reduce((html, item) => {
  //     return html + this.getBannerItemHTML(item.imageName);
  //   }, '');

  //   this.banners.forEach((item,i) => {
  //     const span = document.createElement('span');
  //     span.addEventListener('mouseover', () => {
  //       this.currentIndex = i;
  //     });
  //     this.paginationBoxDOM.append(span);
  //   });
  // }

  // 启动定时器
  openTimer() {
    this.timer = setInterval(() => {
      this.currentIndex++;
    }, 3000);
  }

  // 清除定时器
  stopTimer() {
    clearInterval(this.timer);
  }

  init() {
    // 初始化
    this.drawDOM(this.banners);
    this.bannerItemDOMs = this.getBannerItemDOMs();
    this.bannerItemDOMsLen = this.bannerItemDOMs.length;
    this.currentIndex = 0;

    // 监听事件
    this.slideLeftBtnDOM.addEventListener('click', () => {
      this.currentIndex--;
    });
    this.slideRightBtnDOM.addEventListener('click', () => {
      this.currentIndex++;
    });

    // 自动轮播
    this.openTimer();
    this.slideBoxDOM.addEventListener('mouseover', () => {
      this.stopTimer();
    });
    this.slideBoxDOM.addEventListener('mouseout', () => {
      this.openTimer();
    })
  }
}

new Slide().init();