using System;
using System.Collections.Generic;
using System.Text;

namespace SDonatori.Models
{
    public class BloodUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string BloodGroup { get; set; }
        public string ImagePath { get; set; }

        public string FullLogoPath
        {
            get
            {
                if (string.IsNullOrEmpty(ImagePath))
                {
                    return string.Empty;
                }
                return String.Format("https://SDonatori.azurewebsites.net/{0}",ImagePath.Substring(1));
            }
        }
        public int Date { get; set; }
        public object ImageArray { get; set; }

    }

}
