import React from 'react'
import { Filled} from '../Images'

function FavoriteProf(props) {
  return (
    <>
      <div className="vc_row-full-width vc_clearfix">
        <h2 style={{ textAlign: 'center' }}>Favorite Professor</h2>
      </div>
      <div className="blog_layout_grid sidebar_position_none">
        <div className="row professor-card">
          {props.favData && props.favData.map(tutor1 => {
            let tutor = tutor1.Tutor[0]
            console.log(tutor1.favorites);
            return <div key={tutor._id} className="col-md-3 col-sm-4 col-xs-6 teacher-col prof-card"

            >
              <div className="teacher_content">
                <div className="teacher_img">

                  {/* // Favorites */}
                  <div className='edit-prof d-grid'>
                    <img src={Filled} alt="filled" onClick={async (e) => {
                      e.stopPropagation()
                      await props.removeFavorites({ id: "/" + tutor1.favorites._id })
                      await props.getFavoriteProfessors({id: tutor1.favorites.studentId})
                    }} />
                  </div>


                  <img width={270} height={180} src={tutor.image} alt={tutor.name} />
                </div>
                <a href="#" title="Watch teacher page">
                  <h4 className="title">{tutor.fname} {tutor.lname}</h4>
                </a>


              </div>
              <div className="multiseparator" />
            </div>
          })}
        </div>
      </div>

      <button type="button" class="btn btn-primary" onClick={(e) => {
        e.stopPropagation()
        props.enableFavFlag({val: false})
        props.showAllTutor(props.tutorData)
      }}>Show All Tutors</button>


    </>

  )
}

export default FavoriteProf
