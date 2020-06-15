import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  test('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '1231231212',
      provider_id: '1231231212',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1231231212');
  });

  test('should be able to create a two appointments on the same time', async () => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '1231231212',
      provider_id: '1231231212',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '1231231212',
        user_id: '1231231212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
