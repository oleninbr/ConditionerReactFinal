import apiClient from './apiClient';

/**
 * Service layer for lookup/reference data
 * Handles fetching of statuses, types, and manufacturers
 */
const lookupsService = {
  /**
   * Fetch all conditioner statuses
   * @returns {Promise<Array>} List of statuses
   */
  async getStatuses() {
    const response = await apiClient.get('/conditioner-statuses');
    return response.data;
  },

  /**
   * Fetch all conditioner types
   * @returns {Promise<Array>} List of types
   */
  async getTypes() {
    const response = await apiClient.get('/conditioner-types');
    return response.data;
  },

  /**
   * Fetch all manufacturers
   * @returns {Promise<Array>} List of manufacturers
   */
  async getManufacturers() {
    const response = await apiClient.get('/manufacturers');
    return response.data;
  },

  /**
   * Fetch all lookup data at once
   * @returns {Promise<Object>} Object containing all lookup arrays
   */
  async getAll() {
    const [statuses, types, manufacturers] = await Promise.all([
      this.getStatuses(),
      this.getTypes(),
      this.getManufacturers(),
    ]);

    return {
      statuses,
      types,
      manufacturers,
    };
  },
};

export default lookupsService;