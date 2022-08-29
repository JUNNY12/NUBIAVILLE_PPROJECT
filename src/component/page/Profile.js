import profileImage from "../../asset/profileImage.webp"
import { BackArrow, Facebook, Linkedin, Twitter } from '../../Icon'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <section>
        <div className='profileHeader'>
          <div className='back'>
              <Link className='link' to={`/home`}><BackArrow /></Link>
          </div>
            <div className="imageContainer">
                <img src={profileImage} alt="Profile User"/>
            </div>

            <div className="name">
                <p className='text-center'>John Doe</p>
                <p className='text-center'>Frontend Developer</p>
            </div>
        </div>
        <div className="details">
            <div>
                <span className='me-2 fs-3 fw-bold'>About:</span>
                <span className='fs-5'>I build web/mobile Applications (React Developer)</span>
            </div>
            <div>
                <span className='me-2 fs-3 fw-bold'>Department:</span>
                <span className='fs-5'>Software Engineering</span>
            </div>
            <div className='location'>
                <span className='me-2 fs-3 fw-bold'>Location:</span>
                <span className='fs-5'>No 302, Aromire, Ikeja Lagos, Nigeria</span>
            </div>
            <div className='text-center mt-3'>
                <h3 className="mb-3">Connect With Me</h3>

                <div className='d-flex justify-content-center align-items-center socialIcon'>
                    <div className='twitter'>
                        <Twitter />
                    </div>

                    <div className='linkedin'>
                        <Linkedin />
                    </div>

                    <div className='facebook'>
                        <Facebook />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Profile