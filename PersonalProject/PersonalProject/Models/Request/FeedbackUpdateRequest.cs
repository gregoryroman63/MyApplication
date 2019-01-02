using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.Models.Request
{
    public class FeedbackUpdateRequest : FeedbackRequest
    {
        public int Id { get; set; }
    }
}