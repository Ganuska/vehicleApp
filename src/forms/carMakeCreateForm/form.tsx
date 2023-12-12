import { autorun } from 'mobx';
import Form from 'mobx-react-form';
import zod from 'mobx-react-form/lib/validators/ZOD';
import { z } from 'zod';
import { toast } from 'react-toastify';
import vehicleStore from '@/Stores/VehicleStore';

const $schema = z.object({
  name: z
    .string()
    .min(2, { message: 'Vehicle make must be at least 3 characters long' })
});

const plugins = {
  zod: zod({
    package: z,
    schema: $schema
  })
};

const fields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Insert Name'
  },
  {
    name: 'description',
    label: 'description',
    placeholder: 'add description'
  }
];

const hooks = {
  onInit(form: { clearing: any; resetting: any; submitting: any }) {
    autorun(() => form.clearing);
    autorun(() => form.resetting);
    autorun(() => form.submitting);
  },
  onSuccess(form: any) {
    vehicleStore.addVehicleMake({
      ...form.values(),
      abrv: form.values().name.substring(0, 3).toUpperCase(),
      name: form.values().name.toUpperCase()
    });
    form.clear();
    vehicleStore.toggleMakeModal();
  },
  onError() {
    toast.error('please fill form correctly');
  }
};

const mobxForm = new Form({ fields }, { hooks, plugins });

export default mobxForm;
