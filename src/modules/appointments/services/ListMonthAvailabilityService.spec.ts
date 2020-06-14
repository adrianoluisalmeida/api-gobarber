import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListMonthAvailabilityService from './ListMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listMonthAvailabilityService: ListMonthAvailabilityService;

describe('ListMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listMonthAvailabilityService = new ListMonthAvailabilityService();
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    const availability = await listMonthAvailabilityService.execute({
      user_id: 'user',
      year: 2020,
      month: 5,
    });
  });
});
