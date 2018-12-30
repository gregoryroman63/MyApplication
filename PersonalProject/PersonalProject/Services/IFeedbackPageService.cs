using System.Collections.Generic;
using PersonalProject.Models;

namespace PersonalProject.Services
{
    public interface IFeedbackPageService
    {
        int CreateFeedback(FeedbackRequest req);
        List<FeedbackList> GetAll();
    }
}