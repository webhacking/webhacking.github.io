---
layout: post
title: "MantisHub SOAP의 웹 서비스 API 정리"
description: ""
date: 2016-02-24
tags: ['API', 'MantisHub', 'soap', '맨티스']
comments: true
share: true
---

현재 우리 회사는 이슈트래커로 GitLab과 맨티스를 사용하는데, 이 중 개발팀은 제외한 인력들과의 커뮤니케이션이 보통 거의 맨티스를
이용하고있다.

API 구글링을 했는데, 한국에서는 맨티스를 많이 사용하지않아서인지는 몰라도 한국 문서 제로..

  

샘플 인스턴스 WSDL 정의는 다음과 같다.

https://mantishub.mantishub.com/api/soap/mantisconnect.php?wsdl

  

보통의 path는 맨티스/api/soap/mantisconnect.php?wsdl 또는
bug/api/soap/mantisconnect.php?wsdl 둘 중 하나이다.

자신의 맨티스 버전이 궁금하다면 mc_version 를 통해서 버전을 가져오길바란다. 아래는 해외 문서를 참고한 내용이다. 또 클라이언트
라이브러리는 아래 두 링크를 참고 바랍니다.

  

링크

[.NET (C#) by MantisHub](https://github.com/mantishub/MantisDotNetClient)

[PHP by MantisHub](https://github.com/mantishub/MantisPhpClient)

  

**문제 관리**

  * mc_issue_exists - 문제가있는 경우 확인합니다.
  * mc_issue_get - 지정된 문제의 세부 사항을 가져옵니다.
  * mc_issue_get_history - 지정된 문제에 대한 역사를 가져옵니다.
  * mc_issue_get_biggest_id은 -보고 마지막 문제의 ID를 가져옵니다.
  * mc_issue_get_id_from_summary - 그 요약 (제목) 주어진 문제의 ID를 가져옵니다.
  * mc_issue_add은 - 문제를 제출합니다.
  * mc_issue_update은 - 문제를 업데이트합니다.
  * mc_issue_set_tags은 - 문제를 태그.
  * mc_issue_delete은 - 문제를 삭제합니다.
  * mc_issue_note_add은 - 의견을 제출합니다.
  * mc_issue_note_delete은 - 댓글을 삭제합니다.
  * mc_issue_note_update - 코멘트를 업데이트합니다.
  * mc_issue_relationship_add은 - 문제의 관계를 추가 할 수 있습니다.
  * mc_issue_relationship_delete - 문제의 관계를 삭제합니다.
  * mc_issue_attachment_add은 - 문제의 첨부 파일을 추가 할 수 있습니다.
  * mc_issue_attachment_delete - 문제의 첨부 파일을 삭제합니다.
  * mc_issue_attachment_get은 - 문제의 첨부 파일 정보를 얻을.
  * mc_issue_checkin은 - 체크인 지정된 ID를 가지는 문제에 대한의 MantisBT에게 통지합니다. (사용되지 않는 기능)

  

**사용자 정의 필드**

  * mc_enum_custom_field_types - 사용자 정의 필드 정의 유형을 가져옵니다.

**태그**

  * mc_tag_get_all - 정의 된 모든 태그를 얻을.
  * mc_tag_add는 - 태그를 추가합니다.
  * mc_tag_delete는 - 태그를 삭제합니다.

  

**필터**

  * mc_filter_get - 지정된 프로젝트에 대해 정의 된 필터를 얻을.
  * mc_filter_get_issues - 지정된 필터 및 페이징 정보를 일치 문제를 얻는다. 합격 "-1"per_page 매개 변수에 대한 모든 문제를 얻을.
  * mc_filter_get_issue_headers - 지정된 필터 및 페이징 정보를 일치하는 문제 헤더를 얻는다. 합격 "-1"per_page 매개 변수에 대한 모든 문제를 얻을.

  

**설정**

  * mc_config_get_string - 지정된 구성 변수의 값을 얻는다.
  * mc_enum_status는 - 상태의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_priorities - 우선 순위의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_severities - 심각도의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_reproducibilities - reproducibilities의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_projections은 - 예측의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_etas는 - ETA는 열거 값 및 레이블을 가져옵니다.
  * mc_enum_resolutions는 - 해상도의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_access_levels - 액세스 수준의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_project_status은 - 프로젝트 상태의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_project_view_states은 - 프로젝트 뷰 상태의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_view_states은 - 문제 뷰 상태의 열거 값 및 레이블을 가져옵니다.
  * mc_enum_get는 - 열거 값과 레이블 이름을 부여 가져옵니다.

  

**프로젝트 관리**

  * mc_project_add은 - 프로젝트를 만듭니다.
  * mc_project_delete - 프로젝트 (그리고 아래의 모든 문제를) 삭제합니다.
  * mc_project_update - 업데이트 프로젝트 정보를 제공합니다.
  * mc_project_get_id_from_name은 - 프로젝트 ID는 이름을 부여받을.
  * mc_project_get_issues_for_user - 사용자 등에 의해 모니터링 사용자, 사용자에 의해 기자, 할당 문제를 얻을
  * mc_project_get_issue_headers은 - 문제에 대한 헤더 정보를 얻을 수 있습니다.
  * mc_project_get_users는 - 사용자가 명시 적으로 프로젝트에 추가됩니다.
  * mc_projects_get_user_accessible - 사용자가 액세스 프로젝트를 얻을.
  * mc_project_get_categories - 프로젝트와 관련된 카테고리를 얻을.
  * mc_project_add_category - 지정된 프로젝트에 카테고리를 추가 할 수 있습니다.
  * mc_project_delete_category - 지정된 프로젝트에서 항목을 삭제합니다.
  * mc_project_rename_category_by_name은 - 범주의 이름을 바꿉니다.
  * mc_project_get_versions - 지정된 프로젝트와 관련된 버전을 얻을.
  * mc_project_version_add은 - 프로젝트 버전을 추가합니다.
  * mc_project_version_update은 - 프로젝트 버전을 업데이트합니다.
  * mc_project_version_delete - 프로젝트 버전을 삭제합니다.
  * mc_project_get_released_versions은 - 발표로 표시된 프로젝트 버전을 찾으실 수 있습니다.
  * mc_project_get_unreleased_versions는 - 출시되지 않은 것으로 표시된 프로젝트 버전을 찾으실 수 있습니다.
  * mc_project_get_attachments은 - 프로젝트 문서 (사용되지 않는 기능)을 얻는다.
  * mc_project_get_custom_fields은 - 프로젝트와 관련된 사용자 정의 필드를 얻을.
  * mc_project_attachment_get - 얻을 프로젝트 문서 (사용되지 않는 기능).
  * mc_project_attachment_add은 - 프로젝트 문서 (사용되지 않는 기능)을 추가합니다.
  * mc_project_attachment_delete - 프로젝트 문서 (사용되지 않는 기능)을 삭제합니다.
  * mc_project_get_all_subprojects - 하위 프로젝트의 목록을 가져옵니다.

  

**사용자**

  * mc_login는 - 사용자 자격 증명을 확인하고 사용자 계정에 대한 정보를 반환합니다.
  * mc_user_pref_get_pref는 - 사용자 환경 설정을 가져옵니다
  * mc_user_profiles_get_all - 사용자와 연관된 환경 프로파일을 가져옵니다.

  

필요에서 한거라기보다는 회사에서 하루 아침 업무할당량 체크하고싶어서 구현했음.

크론으로 1시간 주기 설정했고, 따로 db에 저장안하고 서버 지정해서(로드밸런싱때문) 텍스트파일로 저장함

걍 json형태로 인코딩해서 저장하면 편한데 그냥 txt확장자로 저장하고 구분은 \n 임.. ㅋㅋ

  

number_format(round(((int)$mantis[2]/($mantis[4] == 0)?0:$mantis[4]) *
100,2)).'%'할당량 되겠다.

한국에서 맨티스 아예 안쓰나봄..외국도 안쓰는 추세인듯한데 우리회사는 왜 사용하지.. ㅎㄷㄷ

  

            $c = new SoapClient('http://호스트/api/soap/mantisconnect.php?wsdl');
            $username = '아이디'; // 영준이 계정
            $password = '패스워드';
            // 아이디,패스워드,page_number,per_page(default 50개)
            $v = $c->mc_project_get_issue_headers($username,utf8_encode($password),138,'',999);
            $v_ver = $c->mc_version();
            $el = array();
            $el_job = 0;
            $el_job_complate = 0;
            foreach ($v as $key => $value){
                $value->last_updated = substr($value->last_updated, 0, strpos($value->last_updated, "T"));
                $d = DateTime::createFromFormat('Y-m-d',$value->last_updated, new DateTimeZone('asia/seoul'));
                $value->last_updated_day = $d->format('d');
                $value->last_updated_month = $d->format('m');
                if($value->last_updated_month == date('m',strtotime('+9 hours')) && $value->last_updated_day == date('d',strtotime('+9 hours'))){
                    $el_job++; //하루 총
                }
                if(($value->status == 60 ||  $value->status == 65 || $value->status == 70 || $value->status == 80 || $value->status == 90) && $value->last_updated_month == date('m',strtotime('+9 hours')) && $value->last_updated_day == date('d',strtotime('+9 hours'))){
                    // 수정완료,검수완료,일부해결,해결,닫음
                    $el_job_complate++;
                }
                if($value->status != 50 || $value->last_updated_day != date('d',strtotime('+9 hours'))){
                    //status 50은, 할당된 이슈 입니다. mc_enum_status 참고
                    continue;
                }else{
                    $el[] = $value;
                }
            }
            $html = "";
            // 버전, 플젝 수, 일 수, 총 일 수
            $html = "".$v_ver."\n".count($v)."\n".count($el)."\n".$el_job."\n".$el_job_complate."";

  

