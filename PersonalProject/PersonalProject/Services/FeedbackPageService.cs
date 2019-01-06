using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web;
using Newtonsoft.Json.Linq;
using PersonalProject.Models;
using PersonalProject.Models.Domain;
using PersonalProject.Models.Request;

namespace PersonalProject.Services
{
    public class FeedbackPageService : IFeedbackPageService
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;

        public bool CheckGoogleTokenId(string id_token, string oAuthId)
        {
            string endPoint = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + HttpUtility.UrlEncode(id_token);
            string googleContentId = "278393184593-j9tk2k5dog3lmmb90n61j1n74leteoe9.apps.googleusercontent.com";

            try
            {
                WebClient client = new WebClient();
                string reply = client.DownloadString(endPoint);
                var data = JObject.Parse(reply);
                string userId = data["sub"].ToString();
                string userEmail = data["email"].ToString();
                string gContentId = data["azp"].ToString();

                if (userId == oAuthId && gContentId == googleContentId)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }

        public List<FeedbackList> Search(int pageIndex, int pageSize, string q)
        {
            using(SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Feedback_Search";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@SearchString", q);
                cmd.Parameters.AddWithValue("@PageIndex", pageIndex);
                cmd.Parameters.AddWithValue("@PageSize", pageSize);
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    List<FeedbackList> feedbackLists = new List<FeedbackList>();
                    while (reader.Read())
                    {
                        FeedbackList feedbackList = new FeedbackList();
                        feedbackList.Id = (int)reader["Id"];
                        feedbackList.FullNameOfEvaluator = reader["FullNameOfEvaluator"] as string;
                        feedbackList.FullNameOfPresenter = reader["FullNameOfPresenter"] as string;
                        feedbackList.PresenterCohort = reader["PresenterCohort"] as string;
                        feedbackList.OverallPresentation = (int)reader["OverallPresentation"];
                        feedbackList.TopicSelection = (int)reader["TopicSelection"];
                        feedbackList.Feedback = reader["Feedback"] as string;
                        feedbackList.DateTimeCreated = (DateTime)reader["DateTimeCreated"];
                        feedbackLists.Add(feedbackList);
                    }
                    return feedbackLists;
                }
            }
        }
        public FeedbackById GetById(int id)
        {
            using(SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Feedback_GetById";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Id", id);

                FeedbackById feedbackById = new FeedbackById();
                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (!reader.Read())
                    {
                        return null;
                    }
                    feedbackById.Id = (int)reader["Id"];
                    feedbackById.FullNameOfEvaluator = reader["FullNameOfEvaluator"] as string;
                    feedbackById.FullNameOfPresenter = reader["FullNameOfPresenter"] as string;
                    feedbackById.PresenterCohort = reader["PresenterCohort"] as string;
                    feedbackById.OverallPresentation = (int)reader["OverallPresentation"];
                    feedbackById.TopicSelection = (int)reader["TopicSelection"];
                    feedbackById.Feedback = reader["Feedback"] as string;
                }
                return feedbackById;
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Feedback_Delete";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", id);

                cmd.ExecuteNonQuery();
            }
        }
        public List<FeedbackList> GetAll(int pageIndex, int pageSize)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Feedback_GetAll";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PageIndex", pageIndex);
                cmd.Parameters.AddWithValue("@PageSize", pageSize);

                using(SqlDataReader reader = cmd.ExecuteReader())
                {
                    List<FeedbackList> feedbackLists = new List<FeedbackList>();
                    while (reader.Read())
                    {
                        FeedbackList feedbackList = new FeedbackList();
                        feedbackList.Id = (int)reader["Id"];
                        feedbackList.FullNameOfEvaluator = reader["FullNameOfEvaluator"] as string;
                        feedbackList.FullNameOfPresenter = reader["FullNameOfPresenter"] as string;
                        feedbackList.PresenterCohort = reader["PresenterCohort"] as string;
                        feedbackList.OverallPresentation = (int)reader["OverallPresentation"];
                        feedbackList.TopicSelection = (int)reader["TopicSelection"];
                        feedbackList.Feedback = reader["Feedback"] as string;
                        feedbackList.DateTimeCreated = (DateTime)reader["DateTimeCreated"];
                        feedbackList.GoogleId = reader["GoogleId"] as string;
                        feedbackList.TotalRows = (int)reader["TotalRows"];
                        feedbackLists.Add(feedbackList);
                    }
                    return feedbackLists;
                }
            };
        }

        public void UpdateFeedback(FeedbackUpdateRequest req)
        {
            using(SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Feedback_Update";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", req.Id);
                cmd.Parameters.AddWithValue("@FullNameOfEvaluator", req.FullNameOfEvaluator);
                cmd.Parameters.AddWithValue("@FullNameOfPresenter", req.FullNameOfPresenter);
                cmd.Parameters.AddWithValue("@PresenterCohort", req.PresenterCohort);
                cmd.Parameters.AddWithValue("@OverallPresentation", req.OverallPresentation);
                cmd.Parameters.AddWithValue("@TopicSelection", req.TopicSelection);
                cmd.Parameters.AddWithValue("@Feedback", req.Feedback);

                cmd.ExecuteNonQuery();
            }
        }

        public int CreateFeedback(FeedbackRequest req)
        {
            using (SqlConnection con = new SqlConnection(connectionString))
            {
                con.Open();
                SqlCommand cmd = con.CreateCommand();
                cmd.CommandText = "Feedback_Insert";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@FullNameOfEvaluator", req.FullNameOfEvaluator);
                cmd.Parameters.AddWithValue("@FullNameOfPresenter", req.FullNameOfPresenter);
                cmd.Parameters.AddWithValue("@PresenterCohort", req.PresenterCohort);
                cmd.Parameters.AddWithValue("@OverallPresentation", req.OverallPresentation);
                cmd.Parameters.AddWithValue("@TopicSelection", req.TopicSelection);
                cmd.Parameters.AddWithValue("@Feedback", req.Feedback);
                cmd.Parameters.AddWithValue("@GoogleId", req.GoogleId);

                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                int newId = (int)cmd.Parameters["@Id"].Value;
                return newId;
            }
        }
    }
    
}   