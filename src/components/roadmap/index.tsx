import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styles from "./RoadMap.module.scss";

function RoadMap() {
  return (
    <>
      <div className="flex justify-center relative">
        <p className={styles.title}>ROADMAP</p>
        <img src="img/roadmap_style (2).png" alt="base" className={styles.base} />
      </div>
      <VerticalTimeline layout='1-column'>
        <VerticalTimelineElement
          contentArrowStyle={{ display: 'none' }}
          iconStyle={{ background: '#131313', color: '#fff', boxShadow: '0 0 0 4px #ffc737', left: '10px', width: '20px', height: '20px', borderRadius: '10px', top: '65px' }}
        >
          <div className={styles.roadmapItem}>
            <img src="img/roadmapicon1.png" alt="icon" />
            <div>The initial stage of Odineum will be to build a strong community base and market the NFT launch
              NFT mint and grace period that will allow investors to trade the NFT&apos;s to try and get a full set.
              This is also when we would begin to market the token launch. </div>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          contentArrowStyle={{ display: 'none' }}
          iconStyle={{ background: '#131313', color: '#fff', boxShadow: '0 0 0 4px #ffc737', left: '10px', width: '20px', height: '20px', borderRadius: '10px', top: '65px' }}
        >
          <div className={styles.roadmapItem}>
            <img src="img/roadmapicon1.png" alt="icon" />
            <div>Once the whitelist investors are determined, the token itself will be launched
              After launch, the initial push will be to streamline as many marketting opportunities as possible
              and this is also when the rest of the projects utility will begin to be built.</div>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          contentArrowStyle={{ display: 'none' }}
          iconStyle={{ background: '#131313', color: '#fff', boxShadow: '0 0 0 4px #ffc737', left: '10px', width: '20px', height: '20px', borderRadius: '10px', top: '65px' }}
        >
          <div className={styles.roadmapItem}>
            <img src="img/roadmapicon1.png" alt="icon" />
            <div>Odineums utility will be released in waves, starting with one project, then moving on to the next
              eventually having an entire platform that covers a wide range of use cases
              and services in the crypto sphere</div>
          </div>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          contentArrowStyle={{ display: 'none' }}
          iconStyle={{ background: '#131313', color: '#fff', boxShadow: '0 0 0 4px #ffc737', left: '10px', width: '20px', height: '20px', borderRadius: '10px', top: '65px' }}
        >
          <div className={styles.roadmapItem}>
            <img src="img/roadmapicon1.png" alt="icon" />
            <div>Once the platform is established Odineum will start to build out the gaming component of the project
              The game will be a Play-to-earn game with competitive/pvp components
              stay tuned for further announcements </div>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </>
  );
};

export default RoadMap;