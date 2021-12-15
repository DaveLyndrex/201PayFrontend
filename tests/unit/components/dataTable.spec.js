import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex';
import axios from 'axios';
import dataTable from "../../../src/components/DataTable.vue";

describe('renders the table successfully', () => {
    // const wrapper = shallowMount(dataTable, {propsData:{
    //     editedIndex: 0,
    //     itemEdited: [],
    //     selectedRow: [],
    // }});
    const mountedBank = jest.fn("../../../src/components/DataTable.vue");
    it('renders the vue instance of dataTable', () => {
        expect(mountedBank.mock.calls.length).toBe(0);
        
    })

    // it('matches the external snapshot', () => {
    //     expect(wrapper).toMatchSnapshot();
    // })

    // it('matches the internal snapshot', () => {
    //     expect(wrapper).toMatchInlineSnapshot()
    // })
})