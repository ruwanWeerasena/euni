using eUni.data.Repositories;
using eUni.data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace eUni.services.admin.Controllers;

[ApiController]
[Route("[controller]")]
public class CourseController : ControllerBase
{
    private readonly ICourseRepository _courseRepository;

    public CourseController(ICourseRepository courseRepository){
        _courseRepository = courseRepository;
    }

    [HttpGet()]
    //[ProducesResponseType(201, Type = typeof(CartDetail))]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetCourses()
    {
        var list = await _courseRepository.GetCoursesAsync();
        Thread.Sleep(3000);
        return Ok(list);
    }


    [HttpGet("{id}")]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetCourse(int id)
    {
        var branch =  await _courseRepository.GetCourseByIdAsync(id);

        if (branch is null)
        {
            return NotFound();
        }

        return Ok(branch);
    }

    [HttpPost]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> Create([FromBody] Course b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Course? addedbranch = await _courseRepository.CreateAsync(b);

        Course? isadded = await _courseRepository.GetCourseByIdAsync(b.CourseId);

        if (isadded is null)
        {
            return BadRequest("Repository failed to add branch");
        }
        else
        {
            return Ok(isadded);
        }
    }

    [HttpPut("{CourseId:int}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int CourseId, [FromBody] Course b)
    {
        if (b is null)
        {
            return BadRequest();
        }

        Course? existing = await  _courseRepository.GetCourseByIdAsync(CourseId);


        if (existing is null)
        {
            return NotFound();
        }

        

        Course? updated =  await _courseRepository.updateAsync(CourseId,b);

        Course? isupdated = await  _courseRepository.GetCourseByIdAsync(CourseId);

        return Ok(isupdated);
    }


    [HttpDelete("{CourseId}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int CourseId)
    {
        Course? existing = await _courseRepository.GetCourseByIdAsync(CourseId);

        if (existing is null)
        {
            return NotFound();
        }

        bool? deleted = await _courseRepository.DeletAsync(CourseId);

        if (deleted.HasValue && deleted.Value)
        {
            return new NoContentResult();
        }
        else
        {
            return BadRequest($"Course {CourseId} was found but failed to delete");
        }
    }
   
}

