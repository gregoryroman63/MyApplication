using System.Collections.Generic;
using PersonalProject.Models;
using PersonalProject.Models.Domain;
using PersonalProject.Models.Request;

namespace PersonalProject.Services
{
    public interface IFeedbackPageService
    {
        int CreateFeedback(FeedbackRequest req);
        void Delete(int id);
        List<FeedbackList> GetAll();
        FeedbackById GetById(int id);
        List<FeedbackList> Search(int pageIndex, int pageSize, string queryString);
        void UpdateFeedback(FeedbackUpdateRequest req);
    }
}