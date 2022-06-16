import { useEffect, useState } from "react";
import "./About.css";

function About() {
  const [showWbHis, setShowWbHis] = useState(false);
  const [showColorMean, setShowColorMean] = useState(false);

  const histTitle = document.getElementById("briefHis");
  const meanTitle = document.getElementById("colorMeaning");

  useEffect(() => {
    if (showWbHis) {
      histTitle.classList.add("activeAbout");
    }
    if (showColorMean) {
      meanTitle.classList.add("activeAbout");
    }
  }, [showWbHis, showColorMean]);

  const clickHis = () => {
    setShowColorMean(false);
    if (histTitle) {
      histTitle.classList.add("activeAbout");
      //   console.log("histTitle is true", histTitle);
    }
    if (meanTitle) {
      meanTitle.classList.remove("activeAbout");
    }
    setShowWbHis(true);
  };

  const clickMeaning = () => {
    setShowWbHis(false);
    if (meanTitle) {
      meanTitle.classList.add("activeAbout");
    }
    if (histTitle) {
      histTitle.classList.remove("activeAbout");
    }
    setShowColorMean(true);
  };

  let content;
  if (showWbHis) {
    // console.log(histTitle)
    // histTitle.classList.add('activeAbout')
    content = (
      <div className="contentInfo">
        <div>
          Handmade waist beads are an age-old tradition in parts of Africa with
          distinct meanings, symbols, and history attached to them.
        </div>
        <ul>
          <li>
            Symbol of Femininity & Sensuality - These beads are usually made by
            women for women of any and all body types and sizes. Some wear the
            beads under their clothes, as a meaning of sanctity and purity, only
            meant to be seen by their lover.
          </li>
          <li>
            Rites of Passage & Symbols of Growth - Mothers would ornament their
            daughters with beads during their first menstruation as a ceremonial
            rite of passage into womanhood. Each time new waist beads were
            inherited it symbolized a healthy life, growth and maturity.
          </li>
          <li>
            Measurements and Body Shaping - Women wear waist beads to get/keep
            their bodies intact. The beads shape your body and keep the waist
            small and hips accentuated. The beads do not stretch, so if/when the
            waist beads start to feel a little tight, it’s a sign that there was
            some weight gain, and vice versa.
          </li>
        </ul>
        <div>
          The person making your waist beads is usually a highly spiritual
          person. The beads, shells, stones, and other things that may go on
          your waist are picked and placed with the intention of something very
          specific.
        </div>
      </div>
    );
  } else if (showColorMean) {
    content = (
      <div className="contentInfo">
        {/* Color Meanings!!!!! */}
        <div>
          The colors of the beads have very specific significations. These
          meanings vary from tribe to tribe, culture to culture, and they’re
          open to interpretation, but traditionally:
        </div>
        <ul>
          <li>
            Blue: knowledge, healing peace, truth, harmony - a cooling color
            symbolizing faith, devotion, deep insight
          </li>
          <li>
            Green: prosperity, hope, harmony, healing and ripening, generous,
            humble; good for heart & circulation
          </li>
          <li>
            Red: self-confidence, vitality, sexual energy, passion courage; good
            for energy, helps liver
          </li>
          <li>
            Yellow: wisdom, knowledge, clarity, increasing awareness, and
            calming nerves; good for digestive system & nerves
          </li>
          <li>
            Purple: spirituality, the sacred, higher self, passion, third eye,
            fulfillment and vitality, royalty, nobility, luxury, power and
            ambition
          </li>
          <li>
            Brown: warmth, stimulates the appetite; steadfastness, simplicity,
            friendliness, dependability and health, wholesomeness, peace
          </li>
          <li>
            White: inherently positive color, purity, virginity, innocence,
            light, goodness, heaven, safety, brilliance, illumination,
            understanding, cleanliness, faith, beginnings, sterility,
            spirituality, humility, sincerity, protection, softness and
            perfection
          </li>
          <li>
            Gold: success, achievement and triumph, higher ideals, wisdom,
            understanding and enlightenment; inspires knowledge, spirituality
            and a deep understanding of the self and the soul
          </li>
          <li>
            Orange: creativity, sexuality, joy, enthusiasm, wellness, personal
            power, self-esteem, confidence; good for intestine & lungs
          </li>
          <li>Pink: compassion, nurturing, love</li>
          <li>
            Black: the absence of color, but required for all other colors to
            have depth and variation of hue; strength, seriousness, power,
            authority, formal, elegant, prestigious
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="about">
      <div className="">
        Click on one of the titles below for more information about waist beads
      </div>
      {/* Take Me Back to the distance!! */}
      <h2 className="aboutWbTitle" id="briefHis" onClick={clickHis}>
        Brief History of Waistbeads
      </h2>
      <h2 className="aboutWbTitle" id="colorMeaning" onClick={clickMeaning}>
        Meaning of Waist Bead Colors
      </h2>
      {content}
    </div>
  );
}

export default About;
