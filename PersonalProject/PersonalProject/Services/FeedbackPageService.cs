using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using PersonalProject.Models;

namespace PersonalProject.Services
{
    public class FeedbackPageService : IFeedbackPageService
    {
        string connectionString = ConfigurationManager.ConnectionStrings["Default"].ConnectionString;

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
                cmd.Parameters.AddWithValue("@Email", req.Email);
                cmd.Parameters.AddWithValue("@PresenterCohort", req.PresenterCohort);
                cmd.Parameters.AddWithValue("@OverallPresentation", req.OverallPresentation);
                cmd.Parameters.AddWithValue("@TopicSelection", req.TopicSelection);
                cmd.Parameters.AddWithValue("@Feedback", req.Feedback);

                cmd.Parameters.Add("@Id", SqlDbType.Int).Direction = ParameterDirection.Output;

                cmd.ExecuteNonQuery();

                int newId = (int)cmd.Parameters["@Id"].Value;
                return newId;
            }
        }
    }
    
}   