import styles from './Testimonies.module.css';
import Student1 from 'src/Assets/students/sophia.png';
import Student2 from 'src/Assets/students/mark.png';
import Student3 from 'src/Assets/students/gustavo.png';
import Testimony from './Testimony';

const Testimonies = () => {
  return (
    <section
      id="depoimentos"
      className={`${styles.sectionTestimony} sectionSpacing`}
    >
      <h2 className="title">Depoimentos</h2>
      <p className="subtitle">
        o que alguns de nossos alunos disseram de nossos cursos
      </p>

      <div className={`${styles.testimonies} container`}>
        <Testimony src={Student1} name="Sophia Moteki">
          Meus filhos adoraram! O que antes era uma matéria complicada, com esta
          plataforma se tornou algo divertido e prazeroso de aprender 😊
        </Testimony>
        <Testimony src={Student2} name="Mark Zuckerberg">
          Paguei pelo plano professional e não me arrependo. Desenvolvi diversos
          conhecimentos fantásticos sobre a natureza.
        </Testimony>
        <Testimony src={Student3} name="Gustavo Souza">
          Impressionante a qualidade dos cursos que oferecem. Aulas com uma
          excelente didática e atualizadas. Aprovo e recomendo!
        </Testimony>
      </div>
    </section>
  );
};

export default Testimonies;
