<template>
  <div class="form">
  <h1>Contact Us</h1>
  <p>Send us an E-Mail for more Infomation!</p>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            label="Full Name"
            placeholder="First and Last Name"
            v-model="name"
            required
            ref="name"
            :rules="[() => !!name || 'This field is required']"
            :error-messages="errorMessages"
          ></v-text-field>
          <v-text-field
            label="Address Line"
            placeholder="Mailing Address"
            :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters',
              this.addressCheck
            ]"
            v-model="address"
            ref="address"
            required
          ></v-text-field>
          <v-text-field
            label="City"
            placeholder="City"
            :rules="[() => !!city || 'This field is required', this.addressCheck]"
            v-model="city"
            ref="city"
            required
          ></v-text-field>
          <v-text-field
            label="State/Province/Region"
            v-model="state"
            :rules="[() => !!state || 'This field is required']"
            required
            ref="state"
            placeholder="State/Province/Region"
          ></v-text-field>
          <v-text-field
            label="ZIP / Postal Code"
            required
            :rules="[() => !!zip || 'This field is required']"
            v-model="zip"
            ref="zip"
            placeholder="Zip Code"
          ></v-text-field>
          <v-select
            autocomplete
            label="Country"
            placeholder="Select..."
            :rules="[() => !!country || 'This field is required']"
            :items="countries"
            v-model="country"
            ref="country"
            required
          ></v-select>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <v-btn flat>Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip
              left
              v-if="formHasErrors"
            >
              <v-btn
                icon
                @click="resetForm"
                slot="activator"
                class="my-0"
              >
                <v-icon>refresh</v-icon>
              </v-btn>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
  export default {
    data: () => ({
      countries: ["Canada","United Kingdom", "United States"],
      errorMessages: [],
      name: null,
      address: null,
      city: null,
      state: null,
      zip: null, 
      country: null,
      formHasErrors: false
    }),

    computed: {
      form () {
        return {
          name: this.name ,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.zip,
          country: this.country
        }
      }
    },

    watch: {
      name () {
        this.errorMessages =[]
      }
    },

    methods: {
      addressCheck () {
        this.errorMessages = this.address && !this.name
          ? ['Hey! I\'m required']
          : []

        return true
      },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
      submit () {
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          if (!this.form[f]) this.formHasErrors = true

          this.$refs[f].validate(true)
        })
      }
    }
  }
</script>

<style>
  .form {
    height: 100%;
    width: 100%;
  }
  
  h1 {
    font-size: 35px;
  }

  p {
    font-size: 18px;
  }
</style>