import ProjectCard from '@/modules/employee/projects/projectCard'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProjectsModule =() =>{
  const { employee_details} = useSelector(state => state.employee)
  return (
    <> 
      <div className='zt-card'>
        <h2 className="text-h5 mb-0 col-span-3">Projects</h2>
        { employee_details && employee_details?.projects?.map((project, index) => (
          <ProjectCard key={index} projectData={project} />
        ))}
      </div>
    </>
  )
}
export default ProjectsModule