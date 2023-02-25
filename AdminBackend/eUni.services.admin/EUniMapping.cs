using AutoMapper;
using eUni.data.Entities;
using eUni.services.admin.ViewModels;

namespace eUni.services.admin
{
    public class EUniMapping : Profile
    {
        public EUniMapping(){

            CreateMap<Batch, BatchViewModel>()
                .ForMember(dest => dest.BranchName, opt => opt.MapFrom(src => src.Branch.Name))
                .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.Name))
                .ForMember(dest => dest.LecturerName, opt => opt.MapFrom(src => src.Lecturer.Name))
                .ForMember(dest => dest.StaffName, opt => opt.MapFrom(src => src.Staff.Name))
                .ForMember(dest => dest.LecturerId, opt => opt.MapFrom(src => src.InchargeLecturerId))
                .ForMember(dest => dest.StaffId, opt => opt.MapFrom(src => src.InchargeStaffId));
        }
    }
}