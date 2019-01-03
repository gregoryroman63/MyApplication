using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using PersonalProject.Models;
using PersonalProject.Models.Domain;
using PersonalProject.Models.Request;
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

        [HttpDelete, Route("{id:int}")]
        public HttpResponseMessage Delete(int id)
        {
            feedbackPageService.Delete(id);
            return Request.CreateResponse(HttpStatusCode.OK, new { Item = "Delete successful." });
        }

        [HttpPut, Route]
        public HttpResponseMessage Update(FeedbackUpdateRequest feedbackUpdateRequest)
        {
            if (feedbackUpdateRequest == null)
            {
                ModelState.AddModelError("", "No body data");
            }
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            feedbackPageService.UpdateFeedback(feedbackUpdateRequest);

            return Request.CreateResponse(HttpStatusCode.OK, new { Item = "Successful update." });
        }

        [HttpGet, Route("{pageindex:int}/{pageSize:int}")]
        public HttpResponseMessage Search(int pageIndex, int pageSize, string q="")
        {
            List<FeedbackList> feedbackLists = feedbackPageService.Search(pageIndex, pageSize, q);
            return Request.CreateResponse(HttpStatusCode.OK, new { Item = feedbackLists });
        }

        [HttpGet, Route("{id:int}")]
        public HttpResponseMessage GetById(int id)
        {
            FeedbackById feedbackById = feedbackPageService.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, new { Item = feedbackById });
        }

        [HttpGet, Route("getall/{pageIndex:int}/{pageSize:int}")]
        public HttpResponseMessage GetAll(int pageIndex, int pageSize)
        {
            List<FeedbackList> feedbackLists = feedbackPageService.GetAll(pageIndex, pageSize);
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