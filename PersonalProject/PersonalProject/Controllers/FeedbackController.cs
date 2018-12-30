using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using PersonalProject.Models;
using PersonalProject.Services;

namespace PersonalProject.Controllers
{   
    [RoutePrefix("api/feedbackpage")]
    public class FeedbackPageController : ApiController
    {
        readonly IFeedbackPageService feedbackPageService;

        public FeedbackPageController(IFeedbackPageService feedbackPageService)
        {
            this.feedbackPageService = feedbackPageService;
        }

        [HttpGet, Route]
        public HttpResponseMessage GetAll()
        {
            List<FeedbackList> feedbackLists = feedbackPageService.GetAll();
            return Request.CreateResponse(HttpStatusCode.OK, new { Item = feedbackLists });
        }

        [HttpPost, Route]
        public HttpResponseMessage Create(FeedbackRequest feedbackRequest)
        {
            if(feedbackRequest == null)
            {
                ModelState.AddModelError("", "Missing Body Data!");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            int newId = feedbackPageService.CreateFeedback(feedbackRequest);
            return Request.CreateResponse(HttpStatusCode.OK, new { Item = newId });
        }
    }
}