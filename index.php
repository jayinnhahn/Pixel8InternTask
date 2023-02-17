<?php

namespace Resources\JuanHR\Modules\AllowanceConfiguration;

use Core\Modules\ModuleInterface;
use Core\System\Messages;
use Resources\JuanHR\System\Main;

class API extends Main implements ModuleInterface
{
    public const GET_PERMISSION_ALIAS = "ALLOWANCE_CONFIGURATION_GET";

    public const POST_PERMISSION_ALIAS = "ALLOWANCE_CONFIGURATION_POST";

    public const PUT_PERMISSION_ALIAS = "ALLOWANCE_CONFIGURATION_PUT";

    public const DELETE_PERMISSION_ALIAS = "ALLOWANCE_CONFIGURATION_DELETE";

    public const FILE_UPLOAD_PERMISSION_ALIAS = null;

    /**
     * Table name
     *
     * @var string
     */
    protected $table;

    /**
     * Acceptable parameters
     *
     * @var array
     */
    protected $accepted_parameters;

    /**
     * Response column
     *
     * @var array
     */
    protected $response_column;

    public function __construct()
    {
        // Table column name
        $this->accepted_parameters = [
            'allowance_id',
            'name',
            'allowance_code',
            'type',
            'include_to_payroll',
            'status',
        ];
        // Table column name
        $this->response_column = [
            'allowance_id',
            'name',
            'allowance_code',
            'type',
            'include_to_payroll',
            'status',
        ];

        // Main table name
        $this->table = 'config_allowances';

        parent::__construct();
    }

    /**
     * HTTP GET handler
     *
     * @param array $params
     * @param bool $api
     * @return array|false|\MysqliDb|string
     * @throws \Exception
     */
    public function httpGet($params = array(), $api = true)
    {
        // Basic validation
        if (!is_array($params)) {
            return $this->Messages->jsonErrorInvalidParameters();
        } else {
            $queryResult = $this->db->get($this->table, $limit ? array($offset, $limit) : null);
        }
            return $api ? $this->buildApiResponse($queryResult, $this->response_column) : $queryResult;
        }
    }

    /**
     * HTTP POST handler
     *
     * @param $payload
     * @return false|string
     * @throws \Exception
     */
    public function httpPost($payload)
    {
        /** Basic validation */
        if (!is_array($payload)) {
            return $this->Messages->jsonErrorInvalidParameters();
        } else {

            /** Validate each property if correct */
            foreach ($payload as $key => $value) {
                if (!in_array($key, $this->accepted_parameters)) {
                    exit($this->Messages->jsonErrorInvalidParameters());
                }
            }

            /** Clean payload */
            $new_config_allowance = $this->trimPayload($payload);

            /** List of required fields must be filled up */
            $required_fields = [
                'name',
                'type',
                'include_to_payroll',
            ];

            /** Check if all fields requred are filled */
            foreach ($required_fields as $field) {
                if (!array_key_exists($field, $new_config_allowance)) {
                    exit($this->Messages->jsonErrorRequiredFieldsNotFilled());
                }
            }
            
            /** Insert payload to DB */
            $new_config_allowance['allowance_id'] = $this->db->insert($this->table, $new_config_allowance);
        
            /** Return success response if insertion success */
            if (!empty($new_config_allowance['allowance_id'])) {
                return $this->buildApiResponse($new_config_allowance, $this->response_column);
            } else {
                return $this->buildApiResponse([
                    'message' => $this->db->getLastError(),
                ], $this->response_column, false);
            }
        }
    }

    /**
     * httpPut
     *
     * @param  mixed $id
     * @param  mixed $payload
     * @param  mixed $api
     *
     * @return void
     */
    public function httpPut($id = null, $payload, $api = true)
    {
        if (empty($id) || !is_numeric($id) || !array_key_exists('allowance_id', $payload)) {
            return $this->Messages->jsonErrorInvalidParameters();
        } else {

            /* Validate each property if correct */
            foreach ($payload as $key => $value) {
                if (!in_array($key, $this->accepted_parameters)) {
                    exit($this->Messages->jsonErrorInvalidParameters());
                }
            }

            /** Clean payload */
            $update_config_allowance = $this->trimPayload($payload);

            /** Lists of required field must be fill up */
            $required_fields = [
                'name',
                'type',
                'include_to_payroll',
                'status',
            ];

            /* Check if all fields requred are filled */
            foreach ($required_fields as $field) {
                if (!array_key_exists($field, $update_config_allowance)) {
                    exit($this->Messages->jsonErrorRequiredFieldsNotFilled());
                }
            }

            /** Check if query param id is equal to payload param allowance_id*/
            if ($id != $update_config_allowance['allowance_id']) {
                exit($this->Messages->jsonErrorInvalidParameters());
            }

            /** Update record */
            $this->db->where('allowance_id', $id);
            if ($this->db->update($this->table, $update_config_allowance)) {
                return $this->buildApiResponse($update_config_allowance, $this->response_column);
            } else {
                return $this->buildApiResponse([
                    'message' => $this->db->getLastError(),
                ], $this->response_column, false);
            }
        }
    }

    /**
     * HTTP DELETE handler
     *
     * @param $id
     * @param $payload
     * @return false|string
     * @throws \Exception
     */
    public function httpDel($id, $payload)
    {
        /** Check if ID or Employee ID exists */
        if (empty($id) || !is_string($id) || (!array_key_exists('allowance_id', $payload))) {
            return $this->Messages->jsonErrorInvalidParameters();
        } else {
            $exploded_ids = array_map('intval', explode(',', $id));

            // Check if id exists in payload
            if (array_key_exists('allowance_id', $payload)) {
                // Check if array of ID(s) matches payload ID(s)
                if (array_diff($exploded_ids, $payload['allowance_id']) !== array_diff($payload['allowance_id'], $exploded_ids)) {
                    exit($this->Messages->jsonErrorInvalidParameters());
                } else {
                    $this->db->where('allowance_id', $exploded_ids, 'IN');
                }
            }

            /** Delete record */
            if ($this->db->delete($this->table)) {
                return $this->buildApiResponse($payload, $this->response_column);
            } else {
                return $this->buildApiResponse([
                    'message' => $this->db->getLastError(),
                ], $this->response_column, false);
            }
        }
    }

    public function httpFileUpload(int $identity, array $payload)
    {
        // TODO: Implement httpFileUpload() method.
    }

    public function httpFileDownload(int $identity, array $payload)
    {
        // TODO: Implement httpFileDownload() method.
    }
}
