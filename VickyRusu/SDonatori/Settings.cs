using System;
using System.Collections.Generic;
using System.Text;
using Plugin.Settings;
using Plugin.Settings.Abstractions;

// aici metodele pt acces in aplicatie (username, password, accestoken)

namespace SDonatori
{
    public static class Settings
    {
        private static ISettings AppSettings
        {
            get
            {
                return CrossSettings.Current;
            }
        }

        #region Setting Constants

        private const string SettingsKey = "settings_key";
        private static readonly string SettingsDefault = string.Empty;

        #endregion


        public static string UserName
        {
            get
            {
                return AppSettings.GetValueOrDefault("username", SettingsDefault);
            }
            set
            {
                AppSettings.AddOrUpdateValue("username", value);
            }
        }


        public static string Password
        {
            get
            {
                return AppSettings.GetValueOrDefault("password", SettingsDefault);
            }
            set
            {
                AppSettings.AddOrUpdateValue("password", value);
            }
        }

        public static string AccessToken
        {
            get
            {
                return AppSettings.GetValueOrDefault("accesstoken", SettingsDefault);
            }
            set
            {
                AppSettings.AddOrUpdateValue("accesstoken", value);
            }
        }

    }
}
