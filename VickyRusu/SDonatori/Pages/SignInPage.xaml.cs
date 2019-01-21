using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SDonatori.Services;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace SDonatori.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class SignInPage : ContentPage
    {
        public SignInPage()
        {
            InitializeComponent();
            NavigationPage.SetHasNavigationBar(this,false);
        }


        private async void BtnLogin_OnClicked(object sender, EventArgs e)
        {
            ApiServices apiServices = new ApiServices();
            bool response = await apiServices.LoginUser(EntEmail.Text, EntPassword.Text);
            if (!response)
            {
                await DisplayAlert("Alert", "Parola gresita...", "Cancel");
            }
            else
            {
                Navigation.InsertPageBefore(new HomePage(), this);
                await Navigation.PopAsync();
            }
        }

        private void TapSignUp_OnTapped(object sender, EventArgs e)
        {
            Navigation.PushAsync(new SignUpPage());
        }
    }
}