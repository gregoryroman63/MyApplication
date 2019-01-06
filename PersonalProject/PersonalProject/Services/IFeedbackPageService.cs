using System.Collections.Generic;
using PersonalProject.Models;
using PersonalProject.Models.Domain;
using PersonalProject.Models.Request;

namespace PersonalProject.Services
{
    public interface IFeedbackPageService
    {
        bool CheckGoogleTokenId(string id_token, string oAuthId);
        int CreateFeedback(FeedbackRequest req);
        void Delete(int id);
        List<FeedbackList> GetAll(int pageIndex, int pageSize);
        FeedbackById GetById(int id);
        List<FeedbackList> Search(int pageIndex, int pageSize, string q);
        void UpdateFeedback(FeedbackUpdateRequest req);
    }
}