using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using SDonatori.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace SDonatori.Services
{
    public class ApiServices
    {
        public async Task<bool> RegisterUser(string email, string password, string confirmPassword)
        {
            var registerModel = new RegisterModel()
            {
                Email = email,
                Password = password,
                ConfirmPassword = confirmPassword
            };
            var httpClient = new HttpClient();
            var json = JsonConvert.SerializeObject(registerModel);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync("https://SDonatorivicky.azurewebsites.net/api/Account/Register", content);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> LoginUser(string email, string password)
        {
            var keyvalues = new List<KeyValuePair<string, string>>()
            {
                new KeyValuePair<string, string>("username",email),
                new KeyValuePair<string, string>("password",password),
                new KeyValuePair<string, string>("grant_type","password"),
            };
            var request = new HttpRequestMessage(HttpMethod.Post, "https://SDonatorivicky.azurewebsites.net/Token");
            request.Content = new FormUrlEncodedContent(keyvalues);
            var httpClient = new HttpClient();
            var response = await httpClient.SendAsync(request);
            var content = await response.Content.ReadAsStringAsync();
            JObject jObject = JsonConvert.DeserializeObject<dynamic>(content);
            var accessToken = jObject.Value<string>("access_token");
            Settings.AccessToken = accessToken;
            Settings.UserName = email;
            Settings.Password = password;
            return response.IsSuccessStatusCode;
        }

        public async Task<List<BloodUser>> FindBlood(string country, string bloodType)
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", Settings.AccessToken);
            var bloodApiUrl = "https://SDonatorivicky.azurewebsites.net/api/BloodUsers";
            var json = await httpClient.GetStringAsync($"{bloodApiUrl}?bloodGroup={bloodType}&country={country}");
            return JsonConvert.DeserializeObject<List<BloodUser>>(json);
        }

        public async Task<List<BloodUser>> LatestBloodUser()
        {
            var httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", Settings.AccessToken);
            var bloodApiUrl = "https://SDonatorivicky.azurewebsites.net/api/BloodUsers";
            var json = await httpClient.GetStringAsync(bloodApiUrl);
            return JsonConvert.DeserializeObject<List<BloodUser>>(json);
        }

        public async Task<bool> RegisterDonatori(BloodUser bloodUser)
        {
            var json = JsonConvert.SerializeObject(bloodUser);
            var httpClient = new HttpClient();
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", Settings.AccessToken);
            var bloodApiUrl = "https://SDonatorivicky.azurewebsites.net/api/BloodUsers";
            var response = await httpClient.PostAsync(bloodApiUrl, content);
            return response.IsSuccessStatusCode;
        }


    }
}
