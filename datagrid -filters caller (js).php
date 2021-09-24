<?php
include_once("../../includes/config2.php");
include_once("segment/session.php");

include_once("../config/db.php");
include_once("../../includes/func_1.php");

$user_id = (int)@$_SESSION['user_id'];

///////////////////////////////////////////////////////////////////////////////////////

if(isset($_GET['del_id']) && $_GET['del_id']!='')
{
    $id = (int)@$_GET['del_id'];
    $conn->query("delete from job_booking where booking_id='{$id}' AND parent_id='{$user_id}'");

    header('Location:booking');exit;
}

///////////////////////////////////////////////////////////////////////////////////////

$SQL = "SELECT
jb.*,
r.name as resource_name,
c.name as client_name,
j.job_name,
u.name as user_name

FROM job_booking jb
LEFT JOIN resourse r ON r.id=jb.resourse_id
LEFT JOIN client c ON c.client_id=jb.client_id
LEFT JOIN job j USING (job_id)
LEFT JOIN user u ON u.user_id=jb.posted_by

WHERE
jb.parent_id='{$user_id}'

ORDER BY
jb.booking_id DESC
";
//echo $SQL;
$result = $conn->query($SQL);

/////////////////////////////---------------------------

$pg_title = 'Manage Bookings | List';
$grid_page = true;

$grid_header = [
'title' => $pg_title,
'opp_page' => ['url'=> 'add_booking'],
'cur_page' => 'booking'
];

include_once("segment/header2.php");
?>

<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.min.js"></script>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" />
<link rel="stylesheet" href="plugins/datepicker/datepicker3.css" />

<style>
.fa {
    vertical-align:middle;
}

.ui-datepicker {
    background: #3c8dbc !important;
    border: 1px solid #555;
    color: #EEE;
}

.ui-state-default {
    background: #3c8dbc !important;
    border: 1px solid #d3d3d3;
    color: #EEE !important;
    font-weight: normal;
}

.ui-datepicker-current-day a {
    border-color: red !important;
    background: red !important;
}

.ui-datepicker-today a {
    background: #fcefa1 !important;
    color: red !important
}
</style>

<div class="box-body">
<table id="grid_table" class="table table-bordered table-striped">
    <thead>
    <tr>
        <th>S. No.</th>
        <th data-filter='select'>Resource</th>
        <th data-filter='select'>Type</th>
        <th data-filter='date_range'>Start at</th>
        <th>End By</th>
        <th data-filter='select'>Client Name</th>
        <th data-filter='text'>Job Name</th>
        <th data-filter='select'>Posted By</th>
        <th data-filter='date'>Posted On</th>
        <th data-filter='select_arr' data-vals="Completed|Pending">Status</th>
        <th></th>
    </tr>
    </thead>

    <tfoot>
    <tr class='filters'>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    </tfoot>

    <tbody>
    <?php
    $sn=1;
    //$job->status==1? 'Completed':'Pending'
    if(is_object($result) && !empty($result))
    {
        while($job = format_str($result->fetch_object()))
        {
        ?>
        <tr id="R<?php echo $job->booking_id;?>">

            <td><?=$sn?></td>
            <td><?=ucwords($job->resource_name)?></td>
            <td><?=$job->job_type?></td>
            <td><?=pretty_date($job->job_date, 'd/m/Y')?> &nbsp;<?=pretty_time($job->job_time)?></td>
            <td><?=pretty_time($job->job_end_time)?></td>
            <td><?=ucwords($job->client_name)?></td>
            <td><?=ucwords($job->job_name)?></td>
            <td><?=ucwords($job->user_name)?></td>
            <td><?=pretty_dateTime2($job->created_on)?></td>

            <td>
                <?php if($job->status==1)
                echo '<i class="fa fa-check-square-o fa-2x" aria-hidden="true" style="color: #09bd09;" title="Completed"></i> &nbsp;Completed';
                else
                echo '<i class="fa fa-clock-o fa-2x" aria-hidden="true" style="color: #367fa9;" title="Pending"></i> &nbsp;Pending';
                ?>
            </td>

            <td>
                <a href="view_booking?id=<?php echo $job->booking_id;?>"  title="View details" class="btn btn-xs btn-info"><i class="fa fa-eye"></i></a>
                <a href="javascript:void(0);" id="<?php echo $job->booking_id; ?>"  title="Delete record" class="btn btn-xs btn-danger delete"><i class="fa fa-trash-o"></i></a>
            </td>
        </tr>
        <?php
        $sn++;
        }//end while..

        $column_filters = true;

        //special work for date range nneds a separate section
        $range_filters = true;
        $range_field = 3;

    }//end if..
    ?>
    </tbody>
</table>
</div>

<?php
include_once("segment/footer2.php");
?>