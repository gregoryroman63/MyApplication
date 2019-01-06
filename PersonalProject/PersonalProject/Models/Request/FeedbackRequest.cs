using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.Models
{
    public class FeedbackRequest
    {
        public string FullNameOfEvaluator { get; set; }
        public string FullNameOfPresenter { get; set; }
        public string PresenterCohort { get; set; }
        public int OverallPresentation { get; set; }
        public int TopicSelection { get; set; }
        public string Feedback { get; set; }
        public string GoogleId { get; set; }
    }
}