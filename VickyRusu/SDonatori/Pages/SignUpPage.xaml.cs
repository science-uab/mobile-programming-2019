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
    public partial class SignUpPage : ContentPage
    {
        public SignUpPage()
        {
            InitializeComponent();
        }

        private async void BtnSignUp_OnClicked(object sender, EventArgs e)
        {
            ApiServices apiServices = new ApiServices();
            bool response = await apiServices.RegisterUser(EntEmail.Text, EntPassword.Text, EntConfirmPassword.Text);
            if (!response)
            {
               await DisplayAlert("Alert", "Parola gresita...", "Cancel");
            }
            else
            {
                await DisplayAlert("Salut", "Contul tau a fost creat", "OK");
                await Navigation.PopToRootAsync();
            }
        }
    }
}