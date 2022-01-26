import { Key } from 'react';
import HTMLFlipBook from 'react-pageflip';

function WhitePaper() {
  const pages = [
    "img/whitepaper/cover.png",
    "img/whitepaper/first_page.png",
    "img/whitepaper/second_page.png",
    "img/whitepaper/third_page.png",
    "img/whitepaper/fourth_page.png",
    "img/whitepaper/fifth_page.png",
    "img/whitepaper/last_page.png",
    "img/whitepaper/sub_header.png"
  ]
  return (
    <div className='whitepaper-bg'>
      <HTMLFlipBook
        className='m-auto border-white-500'
        startPage={0}
        size='fixed'
        width={680}
        height={900}
        minWidth={375}
        maxWidth={2480}
        minHeight={667}
        maxHeight={3508}
        drawShadow={false}
        flippingTime={1000}
        usePortrait
        startZIndex={0}
        autoSize
        maxShadowOpacity={1}
        showCover
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={100}
        showPageCorners
        disableFlipByClick={false}
        style={{ margin: 'auto auto' }}
      >
        {pages.map((item: string, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`image-${index}`}>
            <img className='w-full h-full' src={item} alt="" />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

export default WhitePaper;