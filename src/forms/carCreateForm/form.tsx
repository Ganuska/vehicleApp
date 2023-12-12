import { autorun } from 'mobx';
import Form from 'mobx-react-form';
import zod from 'mobx-react-form/lib/validators/ZOD';
import { z } from 'zod';
import { toast } from 'react-toastify';
import vehicleStore from '@/Stores/VehicleStore';

const $schema = z.object({
  vehicleMake: z
    .string()
    .min(2, { message: 'Vehicle make must be at least 2 characters long' }),
  vehicleModel: z
    .string()
    .min(2, { message: 'Vehicle model must be at least 2 characters long' })
});

const plugins = {
  zod: zod({
    package: z,
    schema: $schema
  })
};

const fields = [
  {
    name: 'vehicleMake',
    label: 'Vehicle Make',
    placeholder: 'Insert vehicleMake'
  },
  {
    name: 'vehicleModel',
    label: 'Vehicle Model',
    placeholder: 'Insert vehicle Model',
    options: {
      autoTrimValue: true
    }
  }
];

const hooks = {
  onInit(form: { clearing: any; resetting: any; submitting: any }) {
    autorun(() => form.clearing);
    autorun(() => form.resetting);
    autorun(() => form.submitting);
  },
  onSuccess(form: any) {
    vehicleStore.addVehicle(form.values());
    form.clear();
    vehicleStore.toggleModal();
  },
  onError() {
    toast.error('please fill form correctly');
  }
};

const mobxForm = new Form({ fields }, { hooks, plugins });

export default mobxForm;
