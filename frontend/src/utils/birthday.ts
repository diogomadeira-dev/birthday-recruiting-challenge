import moment from "moment";

const calculateAge = (birthdate: Date) => {
    const today = moment();
    const birthDate = moment(birthdate, 'YYYY-MM-DD');
    const age = today.diff(birthDate, 'years');
    return age;
  };

export const calculateNextAnniversaries = (customersBirthday: any) => {
    const today = new Date();
    const currentYear = today.getFullYear();

    const nextAnniversariesData = customersBirthday.map((customer: any) => {
      const birthdate = new Date(customer.birthday);
      const nextAnniversary = new Date(currentYear, birthdate.getMonth(), birthdate.getDate());

      if (today > nextAnniversary) {
        nextAnniversary.setFullYear(currentYear + 1);
      }

      const daysUntilNextAnniversary = Math.floor((nextAnniversary - today) / (24 * 60 * 60 * 1000));

      return {
        ...customer,
        month: moment(birthdate).format('MMMM'),
        day: moment(birthdate).format('dddd'),
        yearsOld: calculateAge(birthdate),
        nextAnniversaryDate: nextAnniversary.toDateString(),
        daysUntilNextAnniversary: daysUntilNextAnniversary,
      };
    });

    const nextAnniversariesDataSorted = nextAnniversariesData.sort((a, b) => a.daysUntilNextAnniversary - b.daysUntilNextAnniversary);

    return nextAnniversariesDataSorted[0]
  };