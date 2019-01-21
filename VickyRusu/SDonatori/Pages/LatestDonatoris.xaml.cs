using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SDonatori.Models;
using SDonatori.Services;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace SDonatori.Pages
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LatestDonatoris : ContentPage
    {
        public ObservableCollection<BloodUser> BloodUsers;
        public LatestDonatoris()
        {
            InitializeComponent();
            BloodUsers = new ObservableCollection<BloodUser>();
            FindBloodDonatoris();
        }
        private async void FindBloodDonatoris()
        {
            ApiServices apiServices = new ApiServices();
            var bloodUsers = await apiServices.LatestBloodUser();
            foreach (var bloodUser in bloodUsers)
            {
                BloodUsers.Add(bloodUser);
            }

            LvBloodDonatoris.ItemsSource = BloodUsers;
        }

        private void LvBloodDonatoris_OnItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            var selectedDonatori = e.SelectedItem as BloodUser;
            if (selectedDonatori != null)
            {
                Navigation.PushAsync(new DonatoriProfilePage(selectedDonatori));

            }

            ((ListView) sender).SelectedItem = null;
        }
    }
}