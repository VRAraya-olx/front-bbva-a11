<template>
  <b-card title="Generador Manual">
    <b-card-text> 8 Dígitos Verificadores </b-card-text>
    <b-card-text>
      <div class="settings">
        <b-form>
          <b-form-group
            label="Referencia a calcular "
            label-cols="2"
            label-for="input-reference"
            description="Referencia de 1 a 20 Caracteres Alfanuméricos"
          >
            <b-form-input
              id="input-reference"
              v-model="referenceSelected"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Importe "
            label-cols="2"
            label-for="input-amount"
            description="Importe de 0.01 a 999,999,999.99 sin comas o signo de pesos, con punto decimal y dos decimales"
          >
            <b-form-input
              id="input-amount"
              v-model="amountSelected"
              type="number"
              step="0.01"
              min="0.01"
              max="999999999.99"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Fecha "
            label-cols="2"
            label-for="input-date"
            description="Fecha mayor o igual a (19/11/2014) con formato (DDMMAAAA)"
          >
            <b-form-datepicker 
              id="input-date" 
              v-model="dateSelected" 
              class="mb-2"
              required
            ></b-form-datepicker>
          </b-form-group>
          <b-form-group
            label="Valor Variable "
            label-cols="2"
            label-for="input-value"
            description="Valor fijo o variable en 0,1,2,3,4,5,6,7,8,9"
          >
            <b-form-select
              id="input-value" 
              v-model="variableValueSelected"
              :options="variableValueOptions"
              required
            />
          </b-form-group>
          <b-form-group
            label=""
            label-cols="2"
            label-for="input-submit"
          >
            <b-button block id="input-submit" type="button" variant="primary" @click="onSubmit">Calcular</b-button>
          </b-form-group>
        </b-form>
      </div>
    </b-card-text>
    
  </b-card>
</template>

<script>
import { BCard, BCardText, BFormGroup, BFormSelect, BFormInput, BFormDatepicker, BForm, BButton } from 'bootstrap-vue'
import store from '../../store'
import { getUserData } from '@/auth/utils';

export default {
  components: {
    BButton,
    BForm,
    BFormSelect,
    BCard,
    BCardText,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
  },
  created() {
  },
  data() {
    return {
      referenceSelected: "",
      amountSelected: 0.01,
      dateSelected: "2020-01-10T03:00:00.000Z",
      userData: null,
      variableValueOptions: [0,1,2,3,4,5,6,7,8,9],
      variableValueSelected: 2
    }
  },
  methods: {
    cleanForm() {
      this.referenceSelected = "",
      this.amountSelected = 0.01,
      this.dateSelected = null
    },
    onSubmit() {
      this.userData = getUserData()
      // console.log(this.referenceSelected)
      store.
        dispatch('form/getReference', {
          freePositions: this.referenceSelected,
          dueDate: this.dateSelected,
          amount: this.amountSelected.toString(),
          freeDigit: this.variableValueSelected,
          userId: this.userData.id
        })
        .then(response => {
          const reference = response.data.paymentReference.reference
          this.$swal({
            title: `Referencia de pago generada: ${reference}`,
            text: 'Copia la referencia generada',
            icon: 'success',
            allowOutsideClick: false,
            showConfirmButton: true,
            confirmButtonText: 'Copiar',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-outline-danger ml-1',
            },
            buttonsStyling: false,
          }).then(result => {
            if (result.value) {
              navigator.clipboard.writeText(reference);
              this.cleanForm()
              this.$swal({
                icon: 'success',
                title: 'Referencia Copiada!',
                allowOutsideClick: false,
                text: `${reference}`,
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            }
          })
        }).catch(error => {
          this.$swal({
              icon: 'error',
              title: 'Error!',
              allowOutsideClick: false,
              text: `La referencia no pudo ser generada`,
            })
        })
    }
  }
}
</script>

<style>

</style>
