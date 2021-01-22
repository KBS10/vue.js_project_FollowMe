<template>
  <div class="MedicalReceipt">
    <h2>외래 접수</h2>

    <table class="medicalReceipt_table">
      <tr>
        <td>진료실</td>
        <td>
          <select
            class="medicalreceipt_clinic"
            name="select"
            style="width: 200px; height: 25px"
          >
            <option value="진료실1">진료실1</option>
            <option value="진료실2">진료실2</option>
            <option value="진료실3">진료실3</option>
            <option value="진료실4">진료실4</option>
            <option value="진료실5">진료실5</option>
          </select>
        </td>
        <td>진료 과목</td>
        <td>
          <select
            class="medicalreceipt_subject"
            name="select"
            style="width: 200px; height: 25px"
          >
            <option value="정신과">정신과</option>
            <option value="이비인후과">이비인후과</option>
            <option value="정형외과">정형외과</option>
            <option value="비뇨기과">비뇨기과</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>초재 구분</td>
        <td>
          <select
            class="medicalreceipt_division"
            name="select"
            style="width: 200px; height: 25px"
          >
            <option value="초진">초진</option>
            <option value="재진">재진</option>
          </select>
        </td>
        <td>담당 의사</td>
        <td>
          <select
            class="medicalreceipt_doctor"
            name="select"
            style="width: 200px; height: 25px"
          >
            <option value="김범수">김범수</option>
            <option value="변희주">변희주</option>
            <option value="신천은">신천은</option>
            <option value="이주용">이주용</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>진료일자</td>
        <td>
          <input
            class="medicalreceipt_date"
            type="Date"
            style="width: 200px; height: 25px"
          />
        </td>
        <td>수납 금액</td>
        <td>
          <div
            class="medicalreceipt_totalPrice"
            style="width: 200px; height: 25px"
          ></div>
        </td>
      </tr>
    </table>

    <div class="button_array">
      <v-btn class="btn_cancel">접수 취소</v-btn>
      <v-btn class="btn_modify">접수 수정</v-btn>
      <v-btn class="btn_receipt">접수</v-btn>
    </div>
  </div>
</template>

<script>
export default {};
</script>
