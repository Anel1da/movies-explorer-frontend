import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs" id="tech">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__subtitle">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="tech__list">
        <li className="tech__item">HTML</li>
        <li className="tech__item">CSS</li>
        <li className="tech__item">JS</li>
        <li className="tech__item">React</li>
        <li className="tech__item">Git</li>
        <li className="tech__item">Express.js</li>
        <li className="tech__item">mongoDB</li>
      </ul>
    </section>
  );
}
