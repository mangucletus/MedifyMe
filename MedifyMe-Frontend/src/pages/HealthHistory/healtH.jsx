import Navbar from "../../components/Navbar/Navbar";
import styles from "./healthH.module.css";

function healthH() {
  return (
    <>
      <Navbar />
      <div className={styles.box}>
        <div className={styles.history}>
          <img src="Ellipse250.png" />
          <div className={styles.d1}>
            <ul>
              <li>Name : &nbsp;&nbsp;Sarah Williams</li>
              <li>Sex : &nbsp;&nbsp;Female</li>
              <li>Age : &nbsp;&nbsp;25</li>
            </ul>
            <ul>
              <li>Allergies : &nbsp;&nbsp;Lactose</li>
              <li>Other Conditions : &nbsp;&nbsp;PCOS</li>
              <li>Weight : &nbsp;&nbsp;56kg</li>
            </ul>
            <ul>
              <li>Medications : &nbsp;&nbsp;</li>    
              <li>Height : &nbsp;&nbsp;150cm</li>
            </ul>
          </div>
          <div className={styles.d2}>
            <ul>
                <li>Overview : &nbsp;&nbsp;Sarah has been experiencing stomach ache since she ate pizza last night. The pain is around 7 on a scale of 1 to 10 and touching the area makes it worse. She is lactose intolerant and is not taking any medications or supplements currently. She has no significant health conditions or diseases that run in the family, and no past medical history or chronic conditions to mention.</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.docvisit}>
        <div className={styles.t1}>
            Doctors Visits
        </div>
        <div className={styles.docs}>
            <div className={styles.doc1}></div>
            <div className={styles.doc1}></div>
            <div className={styles.doc1}></div>
            <div className={styles.doc1}></div>
        </div>
      </div>
      <div className={styles.button}>
        <a href="">
            <div className={styles.b}>Create New Record</div>
        </a>
      </div>
    </>
  );
}

export default healthH;