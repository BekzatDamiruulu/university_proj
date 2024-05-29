using System.Linq.Dynamic.Core;
using UniversitySolution.Api.DTOs;
using UniversitySolution.BusinessLogic.Entities;
using UniversitySolution.BusinessLogic.enums;

namespace UniversitySolution.Api.Utils;

public class SubjectMapper
{
        public static SubjectDto ToSubjectDto(Subject subject)
        {
            return new SubjectDto()
            {
                Id = subject.Id,
                GroupId = subject.GroupId,
                NameOfSubject = subject.NameOfSubject,
                NumberOfSubject = subject.NumberOfSubject, TeacherId = subject.TeacherId,
                TypeOfSubject = subject.TypeOfSubject,
                Day = subject.Day.ToString(),
                Ends = subject.Ends,
                Starts = subject.Starts,
                Teacher = DtoMapper.ToEntityDto<Teacher,TeacherDto>(subject.Teacher) ,
                RoomNumber = subject.RoomNumber
            };
        }

        public static Subject ToSubject(SubjectDto subjectDto)
        {
            var isValid = Enum.TryParse(typeof(Days) , subjectDto.Day,true,out var res);
            if (!isValid || res == null)
            {
                throw new Exception($"{subjectDto.Day } day is not valid !" );
            }
            var dayNumber = Enum.GetValues(typeof(Days)).ToDynamicArray().ToList().IndexOf(res);
            Days day = Enum.GetValues(typeof(Days)).ToDynamicArray()[dayNumber];
            return new Subject
            {
                Id = default,
                GroupId = subjectDto.GroupId,
                NameOfSubject = subjectDto.NameOfSubject,
                Day = day,
                NumberOfSubject = subjectDto.NumberOfSubject,
                TeacherId = subjectDto.TeacherId,
                TypeOfSubject = subjectDto.TypeOfSubject
                ,Ends = subjectDto.Ends,
                Starts = subjectDto.Starts,
                RoomNumber = subjectDto.RoomNumber
            };
        }
}