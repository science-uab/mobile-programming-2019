using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace SDonatori.Pages
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class HomePage : ContentPage
	{
		public HomePage ()
		{
			InitializeComponent ();
		}

	    private void Tblogout_OnClicked(object sender, EventArgs e)
	    {
	        Settings.UserName = "";
	        Settings.Password = "";
	        Settings.AccessToken = "";
            Navigation.InsertPageBefore(new SignInPage(), this);
	        Navigation.PopAsync();
	    }

	    private void TapFindBlood_OnTapped(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(new FindBloodPage());
	    }

	    private void TapRegisterBlood_OnTapped(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(new RegisterBloodPage());
	    }

	    private void TapLatestDonatoris_OnTapped(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(new LatestDonatoris());
	    }

	    private void TapHelp_OnTapped(object sender, EventArgs e)
	    {
	        Navigation.PushAsync(new HelpPage());
	    }
	}
}