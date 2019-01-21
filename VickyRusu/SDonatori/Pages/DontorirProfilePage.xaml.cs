using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SDonatori.Models;
using Plugin.Messaging;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace SDonatori.Pages
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class DonatoriProfilePage : ContentPage
	{
	    private string _email;
	    private string _phoneNumber; 
        public DonatoriProfilePage (BloodUser bloodUser)
		{
			InitializeComponent ();
		    ImgDonatori.Source = bloodUser.FullLogoPath;
		    LblDonatoriName.Text = bloodUser.UserName;
		    LblBloodGroup.Text = bloodUser.BloodGroup;
		    LblCountry.Text = bloodUser.Judetul;
		    _email = bloodUser.Email;
		    _phoneNumber = bloodUser.Phone;
		}

	    private void TapEmail_OnTapped(object sender, EventArgs e)
	    {
	        var emailMessenger = CrossMessaging.Current.EmailMessenger;
	        if (emailMessenger.CanSendEmail)
	        {
	            // Send simple e-mail to single receiver without attachments, bcc, cc etc.
	            emailMessenger.SendEmail(_email, "Add a subject","Write Email Body");
	        }
	    }

            private void TapPhone_OnTapped(object sender, EventArgs e)
	    {
	        var phoneDialer = CrossMessaging.Current.PhoneDialer;
	        if (phoneDialer.CanMakePhoneCall)
	            phoneDialer.MakePhoneCall(_phoneNumber);

        }
    }
}