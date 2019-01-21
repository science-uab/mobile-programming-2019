using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SDonatori.Helpers;
using SDonatori.Models;
using SDonatori.Services;
using Plugin.Media;
using Plugin.Media.Abstractions;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace SDonatori.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class RegisterBloodPage : ContentPage
    {
        public MediaFile file;
        public RegisterBloodPage()
        {
            InitializeComponent();
        }

        private async void TapOpenCamera_OnTapped(object sender, EventArgs e)
        {
            await CrossMedia.Current.Initialize();

            if (!CrossMedia.Current.IsCameraAvailable || !CrossMedia.Current.IsTakePhotoSupported)
            {
                await DisplayAlert("No Camera", ":( No camera available.", "OK");
                return;
            }

            file = await CrossMedia.Current.TakePhotoAsync(new Plugin.Media.Abstractions.StoreCameraMediaOptions
            {
                Directory = "Sample",
                Name = "test.jpg"
            });

            if (file == null)
                return;

            await DisplayAlert("File Location", file.Path, "OK");

            ImgDonatori.Source = ImageSource.FromStream(() =>
            {
                var stream = file.GetStream();
                return stream;
            });

        }

        private async void BtnSubmit_OnClicked(object sender, EventArgs e)
        {
            var imageArray = FilesHelper.ReadFully(file.GetStream());
            file.Dispose();
            var country = PickerCountry.Items[PickerCountry.SelectedIndex];
            var bloodGroup = PickerBloodGroup.Items[PickerBloodGroup.SelectedIndex];

            DateTime dateTime = DateTime.Now;
            int d = Convert.ToInt32(dateTime.ToOADate());

            var bloodUser = new BloodUser()
            {
                UserName = EntName.Text,
                Email = EntEmail.Text,
                Phone = EntPhone.Text,
                BloodGroup = bloodGroup,
                Judetul = country,
                ImageArray = imageArray,
                Date = d
            };
            ApiServices apiServices = new ApiServices();
            bool response = await apiServices.RegisterDonatori(bloodUser);
            if (!response)
            {
                DisplayAlert("Alert", "Ceva nu-i bine", "Cancel");
            }
            else
            {
                DisplayAlert("Salut", "Ai fost inregistrat cu succes", "OK");
            }

        }
    }
}