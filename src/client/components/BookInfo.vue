<template>
<tbody>
    <tr>
        <td class="first" rowspan="2"><img :src="book.imgUrl" /></td>
        <td class="top"><a :href="book.url">{{book.title}}</a></td>
        <td class="top">{{book.author}}</td>
        <td class="top">{{book.year}}</td>
        <td class="top">
            <span class="glyphicon glyphicon-trash"
                  aria-hidden="true"
                  @click="onRemove(book)">
            </span>
        </td>
    </tr>
    <tr>
        <td colspan="3">{{book.description}}</td>
        <td></td>
    </tr>
</tbody>
</template>

<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'BookInfo',
    // these values will be filled in by parent component, values must match tag's attribute names
    props: [
        'book',
        'onRemove'
    ]
}
</script>

<style lang="scss" scoped>
/* load global variable definitions so colors can be managed in a single place if needed */
@import "../assets/css/theme.scss";

.first {
    width: 1%;
}

.top {
    height: 1.5em;
}
</style>
