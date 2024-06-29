import ProjectCard from '@/modules/employee/projects/projectCard'
import React from 'react'

const Projects = [
  {
    "name": "Office Management",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
    "leaders": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": ""},
    ],
    "team": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": ""},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": ""},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg"}
    ],
    "progress": "70%"
  },
  {
    "name": "Office Management",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
    "leaders": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
    ],
    "team": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg"}
    ],
    "progress": "40%"
  },
  {
    "name": "Office Management",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
    "leaders": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
    ],
    "team": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg"}
    ],
    "progress": "20%"
  },
  {
    "name": "Office Management",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
    "leaders": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
    ],
    "team": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg"}
    ],
    "progress": "70%"
  },
  {
    "name": "Office Management",
    "openTasks": 1,
    "completedTasks": 9,
    "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. When an unknown printer took a galley of type and scrambled it...",
    "deadline": "17 Apr 2024",
    "leaders": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
    ],
    "team": [
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-01.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-02.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-03.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-04.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-05.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-06.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-07.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-08.jpg"},
      {"firstName": "ahmed", "lastName": "raza", "avatar": "/assets/images/users/user-09.jpg"}
    ],
    "progress": "55%"
  }
]

export default function ProjectsModule () {
  return (
    <>
      <div className='zt-projectsList'>
        <h2 className="text-h5 mb-0 col-span-3">Projects</h2>
        {Projects.map((project, index) => (
          <ProjectCard key={index} projectData={project} />
        ))}
      </div>
    </>
  )
}
