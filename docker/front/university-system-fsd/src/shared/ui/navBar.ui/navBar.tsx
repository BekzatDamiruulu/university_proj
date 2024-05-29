import group from './../../assets/images/groups.svg'
import students from './../../assets/images/students.svg'
import teacher from './../../assets/images/teachers.svg'
import createGroup from './../../assets/images/createGroup.svg'
import addStudent from './../../assets/images/addStudent.svg'
import schedule from './../../assets/images/schedule.svg'
import addTeacher from './../../assets/images/teacher.svg'
import './navBar.ui.styles.sass'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
const images = [
    { img: group, text: 'Группы', url: '/groups' },
    { img: students, text: 'Студенты', url: '/students' },
    { img: teacher, text: 'Учителя', url: '/teachers' },
    { img: createGroup, text: 'Создать группу', url: '/new-group' },
    { img: addStudent, text: 'Добавить студента', url: '/new-student' },
    { img: addTeacher, text: 'Добавить учителя', url: '/new-teacher' },
    { img: schedule, text: 'Расписание', url: '/schedule' },
]

export const NavBar = () => {
    const location = useLocation().pathname
    const navigate = useNavigate()

    useEffect(() => {
        if (location === '/') {
            navigate('/groups')
        }
    }, [])

    return (
        <nav className="nav">
            {images.map((obj, i) => (
                <Link
                    key={obj.text + i}
                    style={{ textDecoration: 'none' }}
                    to={obj.url}
                    onClick={(e) => {
                        if (location === obj.url) {
                            e.preventDefault()
                        }
                    }}
                >
                    <div
                        className={`nav__block ${
                            location.toLocaleLowerCase() ===
                            obj.url.toLocaleLowerCase()
                                ? 'nav__block-active'
                                : ''
                        }`}
                    >
                        <img src={obj.img} alt="" />
                        <div className="nav__text">{obj.text}</div>
                    </div>
                </Link>
            ))}
        </nav>
    )
}
