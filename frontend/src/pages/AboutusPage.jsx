import React from "react";
import locationImage from "../assets/location.jpeg";
import phone from "../assets/phone.png";
import person2 from "../assets/person2.jpg";
import person1 from "../assets/person1.jpeg";
import person3 from "../assets/person3.jpg";
import person4 from "../assets/person4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faFacebook,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="introduction-section">
        <div className="introduction-container">
          <div className="introduction-messages">
            <h2 className="introduction-title">
              <span>Introduction</span> To Safe Track !
            </h2>
            <p className="introduction-contents">
              &emsp; &emsp; &emsp; Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Laborum ducimus at libero. Iste neque ad laborum
              reprehenderit quibusdam dolore placeat assumenda aspernatur
              dolorem quae. Temporibus recusandae suscipit, rem culpa nobis
              inventore debitis, itaque sed reiciendis esse at doloremque rerum
              enim ad, quo fuga eum distinctio quasi fugit dolores. Excepturi
              molestias sint id esse dicta eos reiciendis deserunt tempore
              facere, cum expedita illo eaque nobis enim, aperiam amet aliquam
              alias! Placeat velit reprehenderit, distinctio tenetur hic sed
              dolorem quidem possimus molestiae quod nostrum eligendi error,
              impedit fugiat blanditiis commodi nisi. Cupiditate quibusdam nobis
              explicabo iure, in culpa autem officiis illum maxime. Lorem, ipsum
              dolorem quidem possimus molestiae quod nostrum eligendi error,
              impedit fugiat blanditiis commodi nisi. Cupiditate quibusdam nobis
              explicabo iure, in culpa autem officiis illum maxime. Lorem, ipsum
            </p>
          </div>
          <div className="introduction-image">
            <img src={locationImage} alt="" />
          </div>
        </div>
        <div className="features">
          <div className="feature">
            <div className="feature-container">
              <img src={phone} alt="" />
              <div className="feature-contents">
                <h2>Emergency Response</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  perspiciati
                </p>
              </div>
            </div>
          </div>
          <div className="feature">
            <div className="feature-container">
              <img src={phone} alt="" />
              <div className="feature-contents">
                <h2>Emergency Response</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  perspiciati
                </p>
              </div>
            </div>
          </div>
          <div className="feature">
            <div className="feature-container">
              <img src={phone} alt="" />
              <div className="feature-contents">
                <h2>Emergency Response</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  perspiciati
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="teams">
        <button className="team-btn"> OUR TEAM</button>
        <h2 className="team-title">
          <span>Team</span> Members
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae enim
          aperiam cupiditate tenetur labore iusto numquam cumque? Ea, aperiam
          nemo?
        </p>
        <div className="team-members">
          <div className="member-container">
            <div className="member-details">
              <h3 className="name">John Doe</h3>
              <div className="post">CEO Director</div>
            </div>
            <img src={person1} alt="" />
            <div className="member-content">
              <a className="media-btn facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a className="media-btn instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a className="media-btn github">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a className="media-btn twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
          <div className="member-container">
            <div className="member-details">
              <h3 className="name">Jane Doe</h3>
              <div className="post">CEO Director</div>
            </div>
            <img src={person2} alt="" />
            <div className="member-content">
              <a className="media-btn facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a className="media-btn instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a className="media-btn github">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a className="media-btn twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
          <div className="member-container">
            <div className="member-details">
              <h3 className="name">Ben Parkar</h3>
              <div className="post">CEO Director</div>
            </div>
            <img src={person3} alt="" />
            <div className="member-content">
              <a className="media-btn facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a className="media-btn instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a className="media-btn github">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a className="media-btn twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
          <div className="member-container">
            <div className="member-details">
              <h3 className="name">Micheal</h3>
              <div className="post">CEO Director</div>
            </div>
            <img src={person4} alt="" />
            <div className="member-content">
              <a className="media-btn facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a className="media-btn instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a className="media-btn github">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a className="media-btn twitter">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}