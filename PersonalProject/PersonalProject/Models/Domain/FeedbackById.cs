using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PersonalProject.Models.Domain
{
    public class FeedbackById : FeedbackRequest
    {
        public int Id { get; set; }
    }
}