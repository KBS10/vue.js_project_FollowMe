<template>
  <div class="MedicalInfo">
    <h2>환자 인적 사항</h2>

    <table class="medicalInfo_top_table">
      <tr>
        <td>환자 번호</td>
        <td>
          <div
            class="medicalInfo_number"
            style="width: 150px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td>환자 성명</td>
        <td>
          <div
            class="medicalInfo_name"
            style="width: 150px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td>주민 번호</td>
        <td>
          <div
            class="medicalInfo_frontSecurityNumber"
            style="width: 100px; height: 25px"
          ></div>
          -
          <div
            class="medicalInfo_backSecurityNumber"
            style="width: 100px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td>우편 번호</td>
        <td>
          <div
            class="medicalInfo_postNumber"
            style="width: 200px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td>주 소</td>
        <td>
          <div
            class="medicalInfo_address"
            style="width: 300px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <div
            class="medicalInfo_detailAddress"
            style="width: 300px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td>전화 번호</td>
        <td>
          <div
            class="medical_telNumber"
            style="width: 300px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td>참고 사항</td>
        <td>
          <div class="medical_note" style="width: 300px; height: 100px"></div>
        </td>
      </tr>
    </table>

    <table class="medicalInfo_bottom_table">
      <tr>
        <td>최종 진료일</td>
        <td>
          <div
            class="medicalInfo_finalClinicDate"
            style="width: 100px; height: 25px"
          ></div>
        </td>
        <td>최종 진료실</td>
        <td>
          <div
            class="medicalInfo_finalClinicRoom"
            style="width: 100px; height: 25px"
          ></div>
        </td>
      </tr>
      <tr>
        <td>최종 진료과</td>
        <td>
          <div
            class="medicalInfo_finalDepartment"
            style="width: 100px; height: 25px"
          ></div>
        </td>
        <td>총 미수금</td>
        <td>
          <div
            class="medicalInfo_totalReceive"
            style="width: 100px; height: 25px"
          ></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data: () => ({
    patient_id: 0,
    patient_name: "",
    resident_number: "",
    phone_number: "",
  }),
  mounted: () => {},
  methods: {},
};
</script>
