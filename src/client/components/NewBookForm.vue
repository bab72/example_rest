<template>
<div class="panel panel-default">
    <div class="panel-heading">
        <h3 class="panel-title">Add New Books</h3>
    </div>
    <div class="panel-body">
        <form id="form" class="form-inline" @submit.prevent="validateBeforeSubmit">
            <div class="form-group">
                <label for="title">Title:</label>
                <input
                       type="text"
                       id="title"
                       name="title"
                       class="form-control"
                       v-model="inputFields.title"
                       v-validate="'required'">
                <p v-if="errors.has('title')" class="text-danger">{{ errors.first('title') }}</p>
                <p v-else>&nbsp;</p>
            </div>
            <div class="form-group">
                <label for="author">Author:</label>
                <input
                       type="text"
                       id="author"
                       name="author"
                       class="form-control"
                       v-model="inputFields.author"
                       v-validate="'required|alpha_spaces'">
                <p v-if="errors.has('author')" class="text-danger">{{ errors.first('author') }}</p>
                <p v-else>&nbsp;</p>
            </div>
            <input type="submit" class="btn btn-primary" value="Add Book">
        </form>
    </div>
</div>
</template>

<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'App',
    // these values will be filled in by parent component, values must match tag's attribute names
    props: [
        'inputFields',
        'onSubmit'
    ],
    methods: {
        validateBeforeSubmit () {
            this.$validator.validateAll().then(isValid => {
                if (isValid) {
                    // data is valid, so we can submit the form
                    this.onSubmit()
                }
                return isValid
            })
        }
    }
}
</script>

<style lang="scss" scoped>
/* load global variable definitions so colors can be managed in a single place if needed */
@import "../assets/css/theme.scss";

.btn-primary {
    background-color: $submitColor;
    vertical-align: top;
}
</style>
