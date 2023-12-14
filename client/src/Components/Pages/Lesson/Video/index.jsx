import React from 'react';
import styles from './Video.module.css';
import { ReactComponent as Arrow } from 'src/Assets/arrow.svg';

const Video = ({ currentLesson }) => {
  const [expandButton, setExpandButton] = React.useState(false);
  const transcriptionRef = React.useRef();

  React.useEffect(() => {
    if (transcriptionRef.current && expandButton === false)
      transcriptionRef.current.scrollTop = 0;
  }, [expandButton]);

  if (!currentLesson) return null;
  return (
    <div className={styles.lesson}>
      <div className={styles.lessonVideo}>
        <iframe
          className={styles.video}
          src={currentLesson.videoUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <div className={styles.transcription}>
        <h2 className={styles.title}>Transcrição</h2>
        {currentLesson.transcription ? (
          <p
            ref={transcriptionRef}
            className={`${styles.text} ${expandButton && styles.active}`}
          >
            {currentLesson.transcription}
          </p>
        ) : (
          <p className={styles.noText}>Ainda não há transcrição disponível.</p>
        )}

        {currentLesson.transcription &&
          (expandButton ? (
            <button
              className={styles.btnExpand}
              onClick={() => setExpandButton(!expandButton)}
            >
              esconder <Arrow className={styles.arrow} />
            </button>
          ) : (
            <button
              className={styles.btnExpand}
              onClick={() => setExpandButton(!expandButton)}
            >
              mostrar <Arrow className={styles.arrow} />
            </button>
          ))}
      </div>
    </div>
  );
};

export default Video;
